import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogIn from './pages/LogIn';
import SignIn from './pages/SignIn';
import ForgetPassword from './pages/ForgetPassword';
import UserPages from './pages/users';
import ProtectedRoute from './protected/ProtectedRoute';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setIsLoading(false);
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
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-emerald-400 to-green-600 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <div className="min-h-screen bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <h1 className="text-white text-4xl">Welcome {user?.username}</h1>
            </div>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/login" element={<LogIn onSwitchToSignup={() => navigate('/register')} onLogin={handleLogin} />} />
      <Route path="/register" element={<SignIn onSwitchToLogin={() => navigate('/login')} isAuthenticated={isAuthenticated} />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<UserPages user={user} onLogout={handleLogout} />} />}
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
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
      <AppContent />
    </Router>
  );
}

export default App;