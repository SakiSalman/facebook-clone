import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { ToastError } from '../../Utility/Alerts/Toast'
import './Verify.scss'


const Verify = () => {

  // use Navigate
  const navigate = useNavigate()
  const {id} = useParams()
    // state for verify ids
    const [user, setUser] = useState('')
    console.log(id);
  // Get users from useEffecc
  useEffect(  () => {
    
   try {
     
    axios.get(`http://localhost:5000/api/user/${id}`)
    .then(res => {
      
      if (res.data._id !== id) {
        ToastError('You are not Alowed To access This Page!')
        navigate('/login')
      }else{
        setUser(res.data)
      }
    })
    .catch(err => {
      ToastError('You are not allow to access this Route!')
      navigate('/login')
    })

   } catch (error) {
    console.log('Server Error');
   }

  },[user]);



  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="wrapper w-25">
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="card-header">
                            <h4>Verify Your Acount!</h4>
                    </div>
                    <div className="card-body">
                            <Link to={`/verify/${user._id}/verifyacount`} className="btn btn-primary">Verify Now</Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Verify
