import React from 'react'
import LoginFooter from '../Footers/LoginFooter/LoginFooter'
import './ForgotAcount.scss'

const ForgotAcount = () => {
  return (
    <>
    
        <section className="forgotacount">
            <div className="ForgotPassword-wrap">
                <div className="card shadow-sm">
                    <div className="card-header bg-white">
                        <h4>Find Your Account</h4>
                        
                    </div>
                    <div className="card-body">

                        <form action="#">
                            <input type="text" className='form-control' placeholder='Email Address or Mobile Phone mumber'/>
                            <hr />
                            <div className="button-wrap">
                                <button className='backbutton btn'>Back</button> <button className='btn btn-primary'>Search</button>
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
