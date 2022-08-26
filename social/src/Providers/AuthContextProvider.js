import { useReducer } from "react"
import AuthContext from "../Contexts/AuthContext"
import AuthReducer from "../Reducers/AuthReducer"

// context Initializatiopn

export const INITIAL_STATE = {
    isLoggedIn : false,
    user : {}
}

const AuthContextProvider = ({children}) => {

const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

return(

    <AuthContext.Provider
        value={
            {
                isLoggedIn : state.isLoggedIn,
                user : state.user,
                dispatch
            }
        }
    >
        {children}
    </AuthContext.Provider>

)

}

export default AuthContextProvider;
