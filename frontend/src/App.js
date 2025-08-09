import './App.css';
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from './pages/landingPage';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext.js';
import VideoMeetComponent from './pages/videoMeet.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth' element={<Authentication />} />
          {/* This below route will move to videoMeet page if any of the url is entered */}
          <Route path='/:url' element={<VideoMeetComponent />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
