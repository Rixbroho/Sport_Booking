import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignIn from './pages/SignIn';
import ForgetPassword from './pages/ForgetPassword';
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';
import AdminProfile from './pages/UserProfile';
import Users from './pages/User';

function App(){
  //block for js 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>HomePage</div>} />
        <Route path="/Login" element={<LogIn/>} />
        <Route path="/SignIn" element={<SignIn/>} />
        <Route path="/ForgetPassword" element={<ForgetPassword/>} />
        <Route path="/adminDashboard" element={<AdminDashboard/>} />
         <Route path="/AdminProfile" element={<AdminProfile/>} />
          <Route path="/Users" element={<Users/>} />
        
      </Routes>
    </Router>
  );
}

export default App;