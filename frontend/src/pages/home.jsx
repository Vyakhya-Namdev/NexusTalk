import React, { useState } from 'react'
import WithAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom';
import "../App.css";
import IconButton from '@mui/material/IconButton';
import RestoreIcon from "@mui/icons-material/Restore";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';

//this home component will be visible only to those persons who end the call
function HomeComponent() {

  let navigate = useNavigate();
  let [meetingCode, setMeetingCode] = useState();
  let {addToUserHistory} = useContext(AuthContext);
  //you'll navigate to the page of meeting code
  let handleJoinVideoCall = async () => {
    // add video call data to history every time you join it
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  }
  return (
    <>
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>SmileMeet</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate("/history")}>
            <RestoreIcon />
          </IconButton>
          <p>History</p>

          {/* if user wants to logout so remove its token and navigate it to signup page */}
          <Button onClick={() => {
            localStorage.removeItem("token")
            navigate("/auth")
          }}>
            Logout
          </Button>
        </div>
      </div >

      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2>Connecting People just like Education Connects Ideas</h2>

            <div style={{ display: "flex", gap: "10px" }}>
              <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined"></TextField>
              <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
            </div>
          </div>
        </div>

        <div className="rightPanel">
          <img src='images/logo_home.svg'/>
        </div>
      </div>

    </>
  )
}


export default WithAuth(HomeComponent)