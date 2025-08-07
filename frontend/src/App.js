import './App.css';
import {Routes, BrowserRouter as Router, Route} from "react-router-dom";
import LandingPage from './pages/landingPage';
import Authentication from './pages/authentication';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/auth' element={<Authentication />} />
      </Routes>
    </Router>
  );
}

export default App;
