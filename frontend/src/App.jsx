import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LogIn from './pages/LogIn';
import SignIn from './pages/SignIn';
import ForgetPassword from './pages/ForgetPassword';

function App(){
  //block for js 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>HomePage</div>} />
        <Route path="/Login" element={<LogIn/>} />
        <Route path="/SignIn" element={<SignIn/>} />
        <Route path="/ForgetPassword" element={<ForgetPassword/>} />
        
      </Routes>
    </Router>
  );
}

export default App;