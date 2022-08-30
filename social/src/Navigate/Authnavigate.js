



// navigate user if he is not loged in

import { useContext } from "react";
import {Navigate} from 'react-router-dom'
import AuthContext from "../Contexts/AuthContext";

const AuthNavigate = ({children}) => {

    const {isLoggedIn} = useContext(AuthContext)

    return isLoggedIn ? children : <Navigate to={'/login'}/>
}


export default AuthNavigate;