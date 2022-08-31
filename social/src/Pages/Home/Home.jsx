import React, { useContext } from 'react'
import AuthContext from '../../Contexts/AuthContext'
import Cookies from 'js-cookie'

const Home = () => {


  // auth context
  const {dispatch} = useContext(AuthContext)

  // handle Logout
  const handleLogout = () => {
    Cookies.remove('access_token')
    dispatch({type : "LOGOUT"})
  }
  return (
    <div>
        <div className="wrap d-flex justify-content-center">
          <div className="card">
            <div className="card-body">
              <h2>Under Constraction!</h2>
              <button className='btn btn-danger w-100' onClick={handleLogout}>Log Out</button>

            </div>
          </div>
        </div>
    </div>
  )
}

export default Home
