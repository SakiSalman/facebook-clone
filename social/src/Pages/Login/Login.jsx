import React, { useState } from 'react'
import LoginFooter from '../Footers/LoginFooter/LoginFooter'
import { Modal } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/js/dist/modal'
import './Login.scss'
import { ToastError, ToastSuccess } from '../../Utility/Alerts/Toast'
const Login = () => {
    // Navigator using useNavigate
    const navigate = useNavigate()
    // State for input update
    const [input, setInput] = useState({
        fname : '',
        sname : '',
        auth : '',
        pass : '',
        date : '',
        month : '',
        year : '',
        gender : ''
    })
    // handler input for fields
    const inputHandler = (e) => {
        
        setInput((prev) => ({
            ...prev, [e.target.name] : e.target.value
        }))

    }

    // Register Handler 
    const registerHandler = async (e) => {

        e.preventDefault()


        if (!input.fname || !input.sname || !input.auth || !input.pass || !input.date || !input.month || !input.year || !input.gender) {

            ToastError('All Fields Are Required!')            
            
        }else{

           await axios.post('http://localhost:5000/api/user', input)
            .then(
                res => {
                    ToastSuccess('Registration Successfully Dne!')
                    navigate('/')

                }
            )
            .catch( err => {
                ToastError('Registration not SuccessFull')
            })
        }
    }
    console.log(input);

    // Modal Show Hide State
    const [show, setShow] = useState(false);

    // Modal Show Hide Controllers
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
  return (
    <div>
        {/* Login Form Section Start */}
        <section className="Login-section">
            <div className="login-container">
                <div className="row">
                    <div className="col-7">
                        <div className="login-brand">
                            <img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="" />
                            <p>Facebook helps you connect and share with the people in your life.</p>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="login-card-wrap">
                            <div className="card card-shadow text-center">
                                <div className="card-body">
                                    <form action="">
                                        <input type="text" name="auth" className="form-control mb-2" placeholder='Email Address or phone' />
                                        <input type="text" name="password" className="form-control mb-2" placeholder='Password' />
                                        <input type="submit" className='btn btn-primary  w-100 py-2' value="Log In" />

                                    </form>
                                   <div className="forgot-password-wrap">
                                   <a href="#" className='forgot-password'>Forgot Password?</a>
                                   </div>
                                   <div className="create-new-aaccount">
                                   <hr />
                                    <button onClick={handleShow} className='newaccount-btn btn'>Create New Account</button>
                                   </div>
                                </div>
                            </div>
                            <p><strong>Create a Page</strong>  for a celebrity, brand or business.</p>
                        </div>
                    </div>
                </div>
               
            </div>
             {/* Register MOdal Start */}
                <Modal show={show} onHide={handleClose}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    className='register-modal'
                >
                <Modal.Header closeButton>

                   <div className="header-text">
                    <h3>Sign Up</h3>
                    <span>It's quick and easy.</span>
                    </div>                
                </Modal.Header>
                <Modal.Body>
                    
                    <div className="register-form">
                        <form onSubmit={registerHandler}>
                            <div className="row mb-2">
                                <div className="col-6">
                                <input type="text" className="form-control" onChange={inputHandler} name="fname" value={input.fname} placeholder="First name"/>
                                </div>
                                <div className="col-6">
                                <input type="text" className="form-control" onChange={inputHandler} name="sname" value={input.sname} placeholder="Surename"/>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12">
                                     <input type="text" className="form-control" onChange={inputHandler} name='auth' placeholder="Mobile Number or Email"/>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-12">
                                     <input type="password" className="form-control" onChange={inputHandler} name='pass' placeholder="Password"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <span>Date of Birth</span>

                                    <div className="date-wraper">
                                    <select onChange={inputHandler} value={input.date} name="date" id="" className='form-select'>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="1">4</option>
                                                <option value="1">5</option>
                                            </select>
                                        <select onChange={inputHandler} value={input.month} name="month" id="" className='form-select'>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>

                                            </select>
                                        <select onChange={inputHandler} value={input.year} name="year" id="" className="form-select" >
                                                <option value="1998">1998</option>
                                                <option value="1999">1999</option>
                                                <option value="2000">2000</option>
                                                <option value="2001">2001</option>
                                            </select>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <span>Gender</span>

                                    <div className="gender-wraper">
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="gender1">
                                                    Male
                                                </label>
                                                <input className="form-check-input" onChange={inputHandler} type="radio" name="gender" value='male' id="gender1"/>
                                            </div>

                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="gender2">
                                                    Female
                                                </label>
                                                <input className="form-check-input"  onChange={inputHandler}type="radio" name="gender" value='female' id="gender2"/>
                                            </div>

                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="gender3">
                                                    Other
                                                </label>
                                                <input className="form-check-input"  onChange={inputHandler} type="radio" name='gender' value='other' id="gender3"/>
                                            </div>
                                    </div>
                                </div>
                                
                            </div>
                            <p className='lear-more'>People who use our service may have uploaded your contact information to Facebook. <a href='#'>Learn more.</a></p>
                            <p className='lear-more'>By clicking Sign Up, you agree to our <a href="#">Terms</a>, <a href="#">Privacy Policy</a> and <a href="#"> Cookies Policy</a>. You may receive SMS notifications from us and can opt out at any time.</p>
                           <div className="signup-wrap">
                                <button className='sign-up-button btn' type='submit'>Sign Up</button>
                           </div>
                        </form>
                    </div>

                </Modal.Body>
            </Modal>
            {/* Register MOdal End */}
        </section>
        
        {/* Login Forem End */}

        {/* Login Page Footer */}
        <LoginFooter/>
        {/* Login Form Footer End */}
      
    </div>
  )
}

export default Login
