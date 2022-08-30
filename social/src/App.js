import {Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login/Login';
import ForgotAcount from './Pages/ForgotAcount/ForgotAcount';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import Home from './Pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss';
import Verify from './Pages/VerifyAcount/Verify';
import VerifyCode from './Pages/VerifyAcount/VerifyCode';
import AuthNavigate from './Navigate/Authnavigate';
import UserNavigate from './Navigate/userNavigate';

function App() {

  return (
    <div className="App">
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path='/home' element={<AuthNavigate><Home/></AuthNavigate>}/>
          <Route path='/login' element={<UserNavigate><Login/></UserNavigate>}/>
          <Route path='/verify/:id' element={<UserNavigate><Verify/></UserNavigate>}/>
          <Route path='/forgotpassword' element={<ForgotAcount/>}/>
          <Route path='/verify/:id/verifyacount' element={<UserNavigate><VerifyCode/></UserNavigate>}/>
          <Route path='/reset/identify' element={<UserNavigate><ForgotAcount/></UserNavigate>}/>
          <Route path='/reset/user/:token' element={<UserNavigate><ResetPassword/></UserNavigate>}/>
        </Routes>
    </div>
  );
}

export default App;
