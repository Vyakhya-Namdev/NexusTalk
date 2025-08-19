import './App.css';
import { Routes, BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import LandingPage from './pages/landingPage';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext.js';
import VideoMeetComponent from './pages/videoMeet.jsx';
import HomeComponent from './pages/home.jsx';
import History from './pages/history.jsx';
import About from './pages/about.jsx';
import ScheduleMeeting from './pages/scheduleMeeting.jsx';
import ScheduledMeetings from './pages/scheduleMeetings.jsx';

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* if user is already logged in then directly open home page */}
          <Route path='/' element={token ? <Navigate to="/home" /> : <LandingPage />} />
          <Route path='/auth' element={<Authentication />} />
          <Route path='/home' element={<HomeComponent />} />
          <Route path='/history' element={<History />} />
          <Route path='/about' element={<About />} />
          <Route path='/schedule-meeting' element={<ScheduleMeeting /> }/>
          {/* This below route will move to videoMeet page if any of the url is entered */}
          <Route path="/scheduled-meetings" element={<ScheduledMeetings />} />
          <Route path='/:url' element={<VideoMeetComponent />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
