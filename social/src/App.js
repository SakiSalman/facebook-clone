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
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/verify/:id' element={<Verify/>}/>
          <Route path='/verify/:id/verifyacount' element={<VerifyCode/>}/>
          <Route path='/reset/identify' element={<ForgotAcount/>}/>
          <Route path='/reset/user/:token' element={<ResetPassword/>}/>
        </Routes>
    </div>
  );
}

export default App;
