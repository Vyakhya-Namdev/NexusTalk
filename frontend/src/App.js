import './App.css';
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from './pages/landingPage';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext.js';
import VideoMeetComponent from './pages/videoMeet.jsx';
import HomeComponent from './pages/home.jsx';
import History from './pages/history.jsx';
import About from './pages/about.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/auth' element={<Authentication />} />
          <Route path='/home' element={<HomeComponent />} />
          <Route path='/history' element={<History />} />
          <Route path='/about' element={<About />} />
          {/* This below route will move to videoMeet page if any of the url is entered */}
          <Route path='/:url' element={<VideoMeetComponent />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
