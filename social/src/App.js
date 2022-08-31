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
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from './Contexts/AuthContext';
import AuthNavigateUser from './Navigate/Authnavigate';
import ResetPasswords from './Pages/ResetPassword/ResetPasswords';
function App() {

  // contxt call
  const {dispatch} = useContext(AuthContext)



  const token = Cookies.get('access_token')
  console.log(token);
  
  // // Verify token from the server with Axios 

  useEffect( () => {

    try {
      axios.get('http://localhost:5000/api/user/me', {
        headers : {
          "Authorization" : `Bearer ${token}`
        }
      }).then(res => {
        dispatch( { type : "LOGIN_SUCCESS", payload : res.data})
      })
      .catch( err => {
        dispatch( { type : "LOGOUT"})
      })
    } catch (error) {
      
    }

  }, [token])

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
          <Route path='/' element={<AuthNavigateUser><Home/></AuthNavigateUser>}/>
          <Route path='/login' element={<UserNavigate><Login/></UserNavigate>}/>
          <Route path='/verify/:id' element={<UserNavigate><Verify/></UserNavigate>}/>
          <Route path='/forgotPassword' element={<ForgotAcount/>}/>
          <Route path='/verify/:id/verifyacount' element={<UserNavigate><VerifyCode/></UserNavigate>}/>
          <Route path='/reset/identify' element={<UserNavigate><ForgotAcount/></UserNavigate>}/>
          <Route path='/reset/user/:id' element={<UserNavigate><ResetPassword/></UserNavigate>}/>
          <Route path='/reset/password/:id' element={<UserNavigate><ResetPasswords/></UserNavigate>}/>
        </Routes>
    </div>
  );
}

export default App;
