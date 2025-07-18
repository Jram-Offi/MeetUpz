import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Joining from './user/Joining';
import MeetingDashboard from './user/MeetingDashboard';
import Login from './user/Login';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<MeetingDashboard />} />
          <Route path="/join" element={<Joining />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
