import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastError, ToastSuccess } from '../../Utility/Alerts/Toast'
import LoginFooter from '../Footers/LoginFooter/LoginFooter'
import './ResetPassword.scss'

const ResetPassword = () => {

    // params
    const {id} = useParams()
   const [user, setUser] = useState('')
   const navigate = useNavigate()


    useEffect(() => {
        try {
            axios.get(`http://localhost:5000/api/user/${id}`)
            .then( res => {
                setUser(res.data)
            })
            .catch( err => {
                console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
 
   }, [user]);


//    ssend Reset password Requiest
   const handleresetcode = (e) => {
            
        e.preventDefault()

    try {
        axios.post('http://localhost:5000/api/user/resetpassword', user)
        .then( res => {
            ToastSuccess('Please Change Password!')
            navigate(`/reset/password/${res.data._id}`)

        })
        .catch( err => {
            ToastError('Email Does not Found!')
        })
    } catch (error) {
        console.log(error);
    }

   }


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
                            
                    <form onSubmit={handleresetcode}>
                        <div className="form-wrapper">
                            <div className="form-field">
                                    <div>
                                        <input className="radiobuttonreset" value={user.email} type="radio" name="email" id="flexRadioDefault1"/>
                                        <label className="form-check-label px-2" htmlFor="flexRadioDefault1">
                                                `Send Code Via {user.email}`
                                        </label>
                                    </div>

                            </div>
                            <div className="user-info-box">
                                <img src="https://www.pinclipart.com/picdir/middle/148-1486972_mystery-man-avatar-circle-clipart.png" alt="avatar" />
                                <p>{user.email}`</p>
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
