import React, { useEffect, useRef, useState } from 'react';
import styles from "../styles/videoMeet.module.css";
import { TextField, Button, IconButton } from "@mui/material";
import io from "socket.io-client";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import MicOffIcon from "@mui/icons-material/MicOff";
import ChatIcon from "@mui/icons-material/Chat";
import Badge from "@mui/material/Badge";

const server_url = "http://localhost:8000";

var connections = {};

const peerConfigreConnections = {
  //ice-servers => This tells WebRTC how to discover the best network route between two peers (e.g., two browsers or apps) — even if they’re behind NATs or firewalls.
  //iceServers is an array of servers used by the ICE (Interactive Connectivity Establishment) protocol.
  "iceServers": [
    { "urls": "stun:stun.l.google.com:19302" }   //this stun server can be changed
    //Stun job is to help a peer discover its public IP address and port when behind NAT.
  ]
}
export default function VideoMeetComponent() {
  var socketRef = useRef();
  let socketIdRef = useRef();    //to store our own socket Id that we recived after login

  let localVideoRef = useRef();   //to see our own video and for seeing other people video we'll define an array

  let [videoAvailable, setVideoAvailable] = useState(true);   //to see if video is available (has video access)

  let [audioAvailable, setAudioAvailable] = useState(true);  //to see if audio is available (has audio access)

  let [video, setVideo] = useState([]);   //to on-off our video will handle by it
  let [audio, setAudio] = useState();   ///to on-off our audio will handle by it
  let [screen, setScreen] = useState();  // to share our screen

  let [showModal, setModal] = useState();  //for pop-up at bottom
  let [screenAvailable, setScreenAvailable] = useState();  //to see if our screen is available or not

  let [messages, setMessages] = useState([]);  //will handle state of all communication messages
  let [message, setMessage] = useState("");;   //message written by us
  let [newMessages, setNewMessages] = useState(3);  //to set the number of new messages came (on chatbox icon)
  let [askForUsername, setAskForUsername] = useState(true);  //to allow guests for login
  let [username, setUsername] = useState("");   //to store the username of person throught which he/she logged in

  const videoRef = useRef([]);
  let [videos, setVideos] = useState([]);

  // if(isChrome() === false){

  // }

  useEffect(() => {
    console.log("HELLO");
    getPermissions()
  }, []);

  //setting Permissions for screen-sharing, audio and video
  const getPermissions = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoPermission) {
        console.log("Video started");
        setVideoAvailable(true);
      } else {
        console.log("Video denied");
        setVideoAvailable(false);
      }

      const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (audioPermission) {
        console.log("audio started");
        setAudioAvailable(true);
      } else {
        console.log("audio denied");
        setAudioAvailable(false);
      }

      //screen-sharing
      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }

      //set audio or video to visible om screen
      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({ audio: audioAvailable, video: videoAvailable });
        if (userMediaStream) {   //set the audio or video to locals
          window.localStream = userMediaStream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = userMediaStream;   //set the audio or video to src object so that it can be visible on screen
          }
        }
      }

    } catch (err) {
      console.log("Error generated: " + err);
    }
  }

  useEffect(() => {
    //if audio & video is not on (or defined) then, it should not be visible to other clients
    if (video !== undefined && audio !== undefined) {
      getUserMedia();   //set the function to make chnges if audio or video is off
      console.log("SET STATE HAS ", video, audio);
    }
  }, [video, audio]);

  let getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);
    connectToSocketServer();

  }

  let getUserMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach(track => track.stop())
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    localVideoRef.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;
      connections[id].addStream(window.localStream)
      connections[id].createOffer().then((description) => {
        console.log(description);
        connections[id].setLocalDescription(description)
          .then(() => {
            socketRef.current.emit("signal", id, JSON.stringify({ "sdp": connections[id].localDescription }))
          }).catch(err => console.log(err));
      })
    }

    stream.getTracks().forEach(track => track.onended = () => {
      setVideo(false);
      setAudio(false);

      try {
        let tracks = localVideoRef.current.srcObject.getTracks()
        tracks.forEach(track => track.stop())
      } catch (e) { console.log(e) }

      //Blacksilence => will show black screen if camera or audio is off of a user
      let blackSilence = (...args) => new MediaStream([black(...args), silence()])
      window.localStream = blackSilence()
      localVideoRef.current.srcObject = window.localStream

      for (let id in connections) {
        connections[id].addStream(window.localStream)

        connections[id].createOffer().then((description) => {
          connections[id].setLocalDescription(description)
            .then(() => {
              socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
            })
            .catch(e => console.log(e))
        })
      }
    })
  }

  let getUserMedia = (() => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
        .then(getUserMediaSuccess)  //this function will trun off my audio or video if I turned off from my side then, from all clients side  
        .then((stream) => { })
        .catch(err => console.log(err));
    } else {
      try {
        //stop all the tracks where audio or video is not available
        let tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach(track => {
          track.stop();
        });
      } catch {

      }
    }
  })

  let gotMessageFromServer = (fromId, message) => {
    var signal = JSON.parse(message)

    if (fromId !== socketIdRef.current) {
      if (signal.sdp) {
        connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
          if (signal.sdp.type === 'offer') {
            connections[fromId].createAnswer().then((description) => {
              connections[fromId].setLocalDescription(description).then(() => {
                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
              }).catch(e => console.log(e))
            }).catch(e => console.log(e))
          }
        }).catch(e => console.log(e))
      }

      if (signal.ice) {
        connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
      }
    }
  }

  let addMessage = () => {

  }

  let connectToSocketServer = () => {
    socketRef.current = io.connect(server_url, { secure: false });
    socketRef.current.on('signal', gotMessageFromServer);
    //catch the emit here which has been thrown in the backend for if any client has joined the call
    socketRef.current.on('connect', () => {
      socketRef.current.emit('join-call', window.location.href);

      socketIdRef.current = socketRef.current.id;    //store the id that we get after connected to call

      socketRef.current.on("chat message", addMessage);

      socketRef.current.on('user-left', (id) => {
        setVideos((videos) => videos.filter((video) => video.socketId !== id))
      })

      socketRef.current.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {
          connections[socketListId] = new RTCPeerConnection(peerConfigreConnections);

          //making signal connection with ice (intereactivity connection establishment)
          connections[socketListId].onicecandidate = function (event) {
            if (event.candidate !== null) {
              socketRef.current.emit("signal", socketListId, JSON.stringify({ 'ice': event.candidate }));
            }
          }

          //setting streams connection, (if want to on multiple things eg, audio, video, screen-sharing at a time. So, to preserve everything while any new thing is openeing)
          connections[socketListId].onaddstream = (event) => {
            let videoExists = videoRef.current.find(video => video.socketId === socketListId);
            if (videoExists) {
              // Update the stream of the existing video
              setVideos(videos => {
                const updatedVideos = videos.map(video =>
                  video.socketId === socketListId ? { ...video, stream: event.stream } : video
                );
                videoRef.current = updatedVideos;
                return updatedVideos;
              });
            } else {
              //if video already not exists and it is new
              console.log("CREATING NEW");
              let newVideo = {
                socketId: socketListId,
                stream: event.stream,
                autoPlay: true,
                playsinline: true
              }

              setVideos(videos => {
                const updatedVideos = [...videos, newVideo];
                videoRef.current = updatedVideos;
                return updatedVideos;
              })
            }
          }

          // Add the local video stream
          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream);
          } else {
            //TODO: Blacksilence (if video has been closed)

            let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            connections[socketListId].addStream(window.localStream);
          }
        })

        if (id === socketIdRef.current) {
          for (let id2 in connections) {
            if (id2 === socketIdRef.current) continue;

            try {
              connections[id2].addStream(window.localStream);
            } catch (err) { }

            //create offer if its not your id
            connections[id2].createOffer().then((description) => {
              connections[id2].setLocalDescription(description)
                .then(() => {
                  socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }));
                  //sdp => session decription
                })
                .catch(e => console.log(e))
            })
          }
        }
      })
    })
  }

  let silence = () => {
    let ctx = new AudioContext()
    let oscillator = ctx.createOscillator()
    let dst = oscillator.connect(ctx.createMediaStreamDestination())
    oscillator.start()
    ctx.resume()
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
  }

  let black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), { width, height })
    canvas.getContext('2d').fillRect(0, 0, width, height)
    let stream = canvas.captureStream()
    return Object.assign(stream.getVideoTracks()[0], { enabled: false })
  }

  //login as a guest if 'setAskForUsername' is false
  let connect = () => {
    setAskForUsername(false);
    getMedia();
  }

  let handleVideo = () => {
    setVideo(!video);
  }

  let handleAudio = () => {
    setAudio(!audio);
  }

  let getDisplayMediaSuccess = (stream) => {
    console.log("HERE")
    try {
      window.localStream.getTracks().forEach(track => track.stop())
    } catch (e) { console.log(e) }

    window.localStream = stream
    localVideoRef.current.srcObject = stream

    for (let id in connections) {
      if (id === socketIdRef.current) continue

      connections[id].addStream(window.localStream)

      connections[id].createOffer().then((description) => {
        connections[id].setLocalDescription(description)
          .then(() => {
            socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
          })
          .catch(e => console.log(e))
      })
    }

    stream.getTracks().forEach(track => track.onended = () => {
      setScreen(false)

      try {
        let tracks = localVideoRef.current.srcObject.getTracks()
        tracks.forEach(track => track.stop())
      } catch (e) { console.log(e) }

      let blackSilence = (...args) => new MediaStream([black(...args), silence()])
      window.localStream = blackSilence()
      localVideoRef.current.srcObject = window.localStream

      getUserMedia()

    })
  }

  let getDisplayMedia = () => {
    if (screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
          .then(getDisplayMediaSuccess)
          .then(stream => { })
          .catch(e => console.log(e));
      }
    }
  }

  useEffect(() => {
    if (screen !== undefined) {
      getDisplayMedia();
    }
  }, []);

  let handleScreen = () => {
    setScreen(!screen);
  }
  return (
    // {window.location.href} => prints the current router path of window
    <div>
      {askForUsername === true ?
        <div>
          <h2>Enter into Lobby</h2>
          <TextField id="outlined-basic" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} variant="outlined" />
          <Button variant="contained" onClick={connect}>Connect</Button>

          <div>
            <video ref={localVideoRef} autoPlay muted></video>
          </div>
        </div> :
        <div className={styles.meetVideoContainer}>

          {/* setting all button that needed for call */}
          <div className={styles.btnContainer}>
            <IconButton onClick={handleVideo}>
              {(video === true) ? <VideocamIcon /> : <VideocamOffIcon />}
            </IconButton>
            <IconButton style={{ color: "red" }}>
              <CallEndIcon />
            </IconButton>
            <IconButton onClick={handleAudio}>
              {(audio === true) ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
            {screenAvailable === true ?
              <IconButton onClick={handleScreen}>
                {(screen === true) ? <ScreenShareIcon /> : <StopScreenShareIcon />}
              </IconButton> : <></>}

            {/*Creating badge chat icon */}
            <Badge badgeContent={newMessages} max={99} color='secondary'>
              <IconButton>
                <ChatIcon />
              </IconButton>
            </Badge>
          </div>

          {/* your video that'll be visible to you */}
          <video className={styles.meetUserVideo} ref={localVideoRef} autoPlay muted></video>

          <div className={styles.conferenceView}>
            {videos.map((video) => (
              <div key={video.socketId}>
                {/* <h2>{video.socketId}</h2> */}
                <video data-socket={video.socketId}
                  ref={ref => {
                    if (ref && video.stream) {
                      ref.srcObject = video.stream;
                    }
                  }}
                  autoPlay></video>
              </div>
            ))}
          </div>
        </div>}
    </div>
  )
}