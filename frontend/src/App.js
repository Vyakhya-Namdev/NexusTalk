import './App.css';
import {Routes, BrowserRouter as Router, Route} from "react-router-dom";
import LandingPage from './pages/landingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
