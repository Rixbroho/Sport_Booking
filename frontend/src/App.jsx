import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignIn from './pages/SignIn';
import ForgetPassword from './pages/ForgetPassword';

function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>HomePage {isAuthenticated && `- Welcome ${user?.username}`}</div>} />
        <Route path="/Login" element={<LogIn onSwitchToSignup={() => {}} onLogin={handleLogin} />} />
        <Route path="/register" element={<SignIn onSwitchToLogin={() => {}} />} />
        <Route path="/ForgetPassword" element={<ForgetPassword/>} />
        
      </Routes>
    </Router>
  );
}

export default App;