





const AuthReducer = (state, {type, payload}) => {


    switch (type) {
        case 'LOGIN_SUCCESS':
            
           return   {
            isLoggedIn : true,
            user : payload,
                   
        }

           case 'LOGOUT':
            
            return {
             
                isLoggedIn : false,
             
            }
    
        default:
            return state
    }



}


export default AuthReducer;