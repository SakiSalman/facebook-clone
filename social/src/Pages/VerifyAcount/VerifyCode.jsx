import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ToastError, ToastSuccess } from '../../Utility/Alerts/Toast'

const VerifyCode = () => {
  // navifgate
  const navigate =  useNavigate()

  // params 
  const {id} = useParams()

  // verify code state update
  const [verifycode, setVerifycide] = useState({
    verifycode : ''
  })

  // Handle verify code submit

  const handleVerify = async (e) => {

    e.preventDefault()

    try {
      if (!verifycode) {

        ToastError('Enter Verify Code !')
        
      }else{
        await axios.post(`http://localhost:5000/api/user/verifyuser`, {verifycode} )
      .then( res => {
          
        if (res.data.message === 'Invalid Verification Code') {
          
          ToastError('Invalid Verification Code')
        }else{
          ToastSuccess('Your Account is Verified!')
          
          navigate('/login')
        }
      })
      .catch( err => {
        console.log(err);
      })
      }

    } catch (error) {
      
    }


  }


console.log(verifycode);
  return (
    <div>
      <div className="container">
        <div className="wrapper-w-25">
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="card-header">
                            <h4>Verify Your Acount!</h4>
                    </div>
                    <div className="card-body">

                        <form onSubmit={handleVerify}>
                            <input type="text" onChange={(e) =>setVerifycide(e.target.value)} value={verifycode.verifycode} name="code" className='form-control' placeholder='Enter verify code here'/>
                            <button type='submit' className='btn btn-primary w-100'>Verify</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyCode
