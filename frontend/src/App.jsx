import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
      <Routes>
        <Route path="/" element={isAuthenticated ? <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center"><h1 className="text-white text-4xl">Welcome {user?.username}</h1></div> : <Navigate to="/Login" replace />} />
        <Route path="/Login" element={<LogIn onSwitchToSignup={(navigate) => navigate('/register')} onLogin={handleLogin} />} />
        <Route path="/register" element={<SignIn onSwitchToLogin={(navigate) => navigate('/Login')} isAuthenticated={isAuthenticated} />} />
        <Route path="/ForgetPassword" element={<ForgetPassword/>} />
        <Route path="*" element={<Navigate to="/Login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;