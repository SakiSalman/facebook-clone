import React from 'react'
import LoginFooter from '../Footers/LoginFooter/LoginFooter'
import './ResetPassword.scss'

const ResetPassword = () => {
  return (
    <>
    
    <section className="forgotacount">
        <div className="ForgotPassword-wrap">
            <div className="card shadow-sm">
                <div className="card-header bg-white">
                    <h4>Reset Your Account</h4>
                    
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                        <h6 className='resetpage-description'>How do you want to receive the code to reset your password?</h6>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            
                    <form action="#">
                        <div className="form-wrapper">
                            <div className="form-field">
                                    <div>
                                        <input class="radiobuttonreset" type="radio" name="email" id="flexRadioDefault1"/>
                                        <label class="form-check-label px-2" for="flexRadioDefault1">
                                                Send Code Via codersaki98@gmail.com
                                        </label>
                                    </div>

                                    <div>
                                        <input class="radiobuttonreset" type="radio" name="phone" id="flexRadioDefault1"/>
                                        <label class="form-check-label px-2" for="flexRadioDefault1" >
                                                send Code Via 01408971554
                                        </label>
                                    </div>
                                    

                            </div>
                            <div className="user-info-box">
                                <img src="https://www.pinclipart.com/picdir/middle/148-1486972_mystery-man-avatar-circle-clipart.png" alt="avatar" />
                                <p>codersaki98@gmail.com</p>
                                <p>facebook user</p>
                            </div>
                        </div>
                            <hr />

                        <div className="button-wrap">
                            <button className='backbutton btn'>Cancel</button> <button className='btn btn-primary'>Send Code</button>
                        </div>

                    </form>
                        </div>
                    </div>

                        
                </div>
                
            </div>
        </div>
    </section>
    <LoginFooter/>


</>
  )
}

export default ResetPassword;
