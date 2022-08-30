



// navigate user if he is not loged in

import { useContext } from "react";
import {Navigate} from 'react-router-dom'
import AuthContext from "../Contexts/AuthContext";

const UserNavigate = ({children}) => {

    const {isLoggedIn} = useContext(AuthContext)

    return isLoggedIn ? <Navigate to={'/'}/> : children;
}


export default UserNavigate;