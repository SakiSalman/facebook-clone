import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastError } from '../../Utility/Alerts/Toast'
import LoginFooter from '../Footers/LoginFooter/LoginFooter'
import './ForgotAcount.scss'

const ForgotAcount = () => {

    // update state for email

    const [email, setEmail] = useState({
        email : ''
    })
    // post email to server to verify
    const handleForgotEmail = async (e) => {
        
        e.preventDefault()

        if (!email) {
            ToastError("All Fields are required!")
        }
        if (email) {
            
            try {
                await  axios.post('http://localhost:5000/api/user/forgotpassword', email)
            .then( res => {
                console.log(res.data);
            })
            .catch( err => {
                console.log(err);
            })

            } catch (error) {
                ToastError('Server Error!')
                console.log(error);
            }
        }
    }
    console.log(email);
  return (


    <>
    
        <section className="forgotacount">
            <div className="ForgotPassword-wrap">
                <div className="card shadow-sm">
                    <div className="card-header bg-white">
                        <h4>Find Your Account</h4>
                        
                    </div>
                    <div className="card-body">

                        <form onSubmit={handleForgotEmail}>
                            <input type="text" className='form-control' value={email.email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address or Mobile Phone mumber'/>
                            <hr />
                            <div className="button-wrap">
                                <Link to={'/'} className='backbutton btn' >Back</Link> 
                                <button className='btn btn-primary' type='submit'>Search</button>
                            </div>
                        </form>
                            
                    </div>
                    
                </div>
            </div>
        </section>
        <LoginFooter/>
    
    
    </>
  )
}

export default ForgotAcount
