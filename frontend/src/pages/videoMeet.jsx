import React, { useEffect, useRef, useState } from 'react';
import "../../src/videoMeet.css";
import { TextField, Button } from "@mui/material";
const server_url = "http://localhost/8000";

var connections = {};

const peerConfigreConnections = {
    //ice-servers => This tells WebRTC how to discover the best network route between two peers (e.g., two browsers or apps) — even if they’re behind NATs or firewalls.
    //iceServers is an array of servers used by the ICE (Interactive Connectivity Establishment) protocol.
    "iceServers" : [ 
        { "urls": "stun.awt.be:3478" }   //this stun server can be changed
        //Stun job is to help a peer discover its public IP address and port when behind NAT.
    ]
}
export default function VideoMeetComponent() {
    var socketRef = useRef();
    let socketIdRef = useRef();    //to store our own socket Id that we recived after login

    let localVideoRef = useRef();   //to see our own video and for seeing other people video we'll define an array

    let [videoAvailable, setVideoAvailable] = useState(true);   //to see if video is available (has video access)

    let [audioAvailable, setAudioAvailable] = useState(true);  //to see if audio is available (has audio access)

    let [video, setVideo] = useState();   //to on-off our video will handle by it
    let [audio, setAudio] = useState();   ///to on-off our audio will handle by it
    let [screen, setScreen] = useState();  // to share our screen
    
    let [showModal, setModal] = useState();  //for pop-up at bottom
    let [screenAvailable, setScreenAvailable] = useState();  //to see if our screen is available or not

    let [messages, setMessages] = useState([]);  //will handle state of all communication messages
    let [message, setMessage] = useState("");;   //message written by us
    let [newMessages, setNewMessages] = useState(0);  //to set the number of new messages came (on chatbox icon)
    let [askForUsername, setAskForUsername] = useState(true);  //to allow guests for login
    let [username, setUsername] = useState("");   //to store the username of person throught which he/she logged in

    const videoRef = useRef([]);
    let [videos, setVideos] = useState([]);

    // if(isChrome() === false){

    // }

    //setting Permissions for screen-sharing, audio and video
    const getPermissions = async() => {
      try{
        const videoPermission = await navigator.mediaDevices.getUserMedia({video: true});
        if(videoPermission){
          console.log("video started");
          setVideoAvailable(true);
        }else{
          setVideoAvailable(false);
        }

        const audioPermission = await navigator.mediaDevices.getUserMedia({audio: true});
        if(audioPermission){
          console.log("audio started");
          setAudioAvailable(true);
        }else{
          console.log("audio not started");
          setAudioAvailable(false);
        }
        
        //screen-sharing
        if(navigator.mediaDevices.getDisplayMedia){
          setScreenAvailable(true);
        }else{
          setScreenAvailable(false);
        }

        //set audio or video to visible om screen
        if(audioAvailable || videoAvailable){
          const userMediaStream = await navigator.mediaDevices.getUserMedia({audio: audioAvailable, video: videoAvailable});
          if(userMediaStream){   //set the audio or video to locals
            window.localStream = userMediaStream;
            if(localVideoRef.current){
              localVideoRef.current.srcObject = userMediaStream;   //set the audio or video to src object so that it can be visible on screen
            }
          }
        }

      }catch(err){
        console.log("Error generated: " + err);
      }
    }
    useEffect(() => {
      getPermissions()
    }, []);

    let getUserMediaSuccess = (stream) => {

    }

    let getUserMedia = (() => {
      if((video && videoAvailable) || (audio && audioAvailable)){
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then(() => {getUserMediaSuccess()})  //this function will trun off my audio or video if I turned off from my side then, from all clients side  
        .then((stream) =>{})
        .catch(err => console.log(err));
      }else{
        try{
          //stop all the tracks where audio or video is not available
          const tracks = localVideoRef.current.srcObject.getTracks();
          tracks.forEach(track => {
            track.stop();
          });
        }catch{

        }
      }
    })

    useEffect(() => {
      //if audio & video is not on (or defined) then, it should not be visible to other clients
      if(video !== undefined && audio !== undefined){
        getUserMedia();   //set the function to make chnges if audio or video is off
      }
    }, [video, audio]);

    let getMedia = () => {
      setVideo(videoAvailable);
      setAudio(audioAvailable);
      // connectToSocketServer();
    }

    //login as a guest if 'setAskForUsername' is false
    let connect = () => {
        setAskForUsername(false);
        getMedia();
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
            <></>}
    </div>
  )
}
