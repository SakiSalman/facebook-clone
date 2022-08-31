
import Users from "../model/userModel.js";
import customError from "./errorController.js";
import bcrypt from 'bcryptjs'
import { sendEMail } from "../Utility/sendemail.js";
import Token from "../model/Token.js";
import { isEmail } from "../Utility/checkEmail.js";
import { isCell } from "../Utility/checkCell.js";
import jwt from 'jsonwebtoken'


/**
 * @access Public
 * @Method GET
 * @Routes api/User
 */


 export const getAllUsers = async (req, res, next) => {


    try {

        const User = await Users.find()

        if (!User) {
            return next(customError(404, "No Data Found By GET Request"))
        }

        if (User) {
            res.status(200).json(User)
        }


    } catch (error) {
        next(error)
    }
    
}
/**
 * @access Public
 * @Method GET
 * @Routes api/User/:id
 */

 export const getsingelUser = async (req, res, next) => {

    const id = req.params.id

    try {

        const User = await Users.findById(id)

        if (!User) {
            return next(customError(404, "No singel Data Found By GET Request"))
        }

        if (User) {
            res.status(200).json(User)
        }


    } catch (error) {
        next(error)
    }
}
/**
 * @access Public
 * @Method POST
 * @Routes api/User
 */

 export const createUser = async (req, res, next) => {

    
            // Has Password When Creating Data
            const salt = await bcrypt.genSalt(10);
            const has_pass = await bcrypt.hash(req.body.pass, salt)

    try {

       const data = await Users.create({
            ...req.body,
            password : has_pass
        })

        res.status(200).json(data)
        
    } catch (error) {
        next(error)
    }
}
/**
 * @access Public
 * @Method PUT/PATCH
 * @Routes api/User/:id
 */

 export const updateUser = async (req, res, next) => {

    const id = req.params.id

    try {

        const User = await Users.findByIdAndUpdate(id, req.body)
        
        res.status(200).json(User)

    } catch (error) {
        next(error)
    }
}
/**
 * @access Public
 * @Method DELETE
 * @Routes api/User/:id
 */

 export const deleteUser = async (req, res, next) => {


    try {

        const User = await Users.findByIdAndDelete(id)

        res.status(200).json(User)



    } catch (error) {
        next(error)
    }
}


// Login & Register Controller for Users
/**
 * @access Public
 * @Method POST
 * @Routes api/register
 */

export const registerUser = async (req, res, next) => {
 
            // check email with regex from body
            let email = isEmail(req.body.auth)
           // Has Password When Creating Data
           const salt = await bcrypt.genSalt(10);
           const has_pass = await bcrypt.hash(req.body.pass, salt)

   try {

    if (email) {

        const data = await Users.create({
            ...req.body,
            password : has_pass,
            email : req.body.auth
        })
    
        // create random code
         const verifycode = Math.floor(100000 + Math.random() * 900000)       
         
         const token = await Token.create({userid : data._id, verifycode : verifycode})
    
         sendEMail(req.body.auth, 'Verify Account', `${verifycode}`)

        res.status(200).json(data)
      
    }

       
   } catch (error) {
       next(error)
       console.log(error);
   }
}


// Login & Register Controller for Users
/**
 * @access Public
 * @Method POST
 * @Routes api/register
 */

export const verifyUser = async (req, res, next) => {

    try {
        // get verified code from client
        const {verifycode} = req.body
        console.log(verifycode);
        // ,match verofocation code with database
        const tokenMatch = await Token.findOne({verifycode : verifycode})



        if (!tokenMatch) {
            next(customError(404, "Invalid Verification Code"))
            res.status(201).json({
                message : 'Invalid Verification Code'
            })
        }


           if (tokenMatch) {
            // get user id from verification code collection

            const id = tokenMatch.userid.valueOf()

            const verified_user = await Users.findByIdAndUpdate(id, {
                isVerified : true
            });
            res.status(200).json(verified_user)
            tokenMatch.remove()
            
        }

    } catch (error) {

        next(error)
        
    }
}
/**
 * @access Public
 * @Method POST
 * @Routes api/login/me
 */

export const userLogin = async (req, res, next) => {

        // get user and password from client
        const {auth, password} = req.body


        try {
            const user = await Users.findOne({
                email : auth
            })
            
            if (!user) {
                res.json({
                    message : 'Account Not Found',
                 })
            }
            if (user) {

                // check apassword
                const passwordCheck = await bcrypt.compare(password, user.password)

                if (passwordCheck) {

                        // Check user Verified
                        if (user.isVerified) {

                            // creating token
                        const token = jwt.sign({id : user._id}, process.env.JWT_SEC )

                        const {password, isVerified, ...loginInfo} = user._doc

                        res.cookie("access_token", token).status(200).json({
                            token : token,
                            user : loginInfo
                        })
                    }
                    if (!user.isVerified) {
                                const verifyToken = await Token.findOne({
                                    userid : user.id
                                })

                                const id = verifyToken._id.valueOf()
                                
                                // create random code
                                    const verifycode = Math.floor(100000 + Math.random() * 900000)   
                                                            
                                    const token = await Token.findByIdAndUpdate(id, {
                                        verifycode : verifycode
                                    })
                                
                                    sendEMail(req.body.auth, 'Verify Account', `Your Verification code is ${verifycode}`)
                
                            res.json({
                            message : 'Acount Not Verified!',
                            id : user._id
                            })
                        }
                      

                }else{
                
                    next(customError(404, 'password not matched'))
                    res.json({
                        message : 'Password Not matched!',
                        id : user._id
                     })
                     
                }
                
                
            }
        } catch (error) {
            next(customError(404, "Server Error!"))
        }
}

/**
 * @access Public
 * @Method POST
 * @Routes api/verifyAcount
 */

export const verifyAcount = async (req, res, next) => {

        // get user and password from client
        const {email} = req.body



        try {
            const user = await Users.findOne({
                email : email
            })
            
            if (!user) {
                res.json({
                    message : 'No acount found with this email!',
                 })
            }
            if (user) {
                // // create random code
                // const verifycode = Math.floor(100000 + Math.random() * 900000)   
                                                                            

                // const token = await Token.create({userid : user._id, verifycode : verifycode})

                // sendEMail(req.body.email, 'Verify Account', `Your Verification code is ${verifycode}`)

                res.send(user)
                
                
            }
        } catch (error) {
            next(404, 'Server error from Veify Acount for Forgot Password!')
            res.send(error)
        }
}



export const userAuthLogin = async (req, res, next) => {

    try {
        const bearer_token = req.headers.authorization

        // get the toen from bearer tokern
        let token = ''
        if(bearer_token){
             token = bearer_token.split(' ')[1]



            //  get token user
            const loged_in_user = jwt.verify(token, process.env.JWT_SEC)
            console.log(loged_in_user);

            // check JWT
            if (!loged_in_user) {

                next(customError(401, 'Invalid TOken'))
                
            }
            if (loged_in_user) {

                const user = await Users.findById(loged_in_user.id)
                res.status(200).json(user)
                
            }
            
        }
        if (!bearer_token) {

            next(customError(404, "TOken Not Found!"))
            
        }
           // check token is found
    } catch (error) {
        next(error)
    }
}


/**
 * @access Public
 * @Method POST
 * @Routes api/verifyAcount
 */

 export const verifyrest = async (req, res, next) => {

    // get user and password from client
    const {email} = req.body

    console.log(email);



    try {
        const user = await Users.findOne({
            email : email
        })
        
        if (!user) {
            res.json({
                message : 'No acount found with this email!',
             })
        }
        if (user) {
                       
            res.send(user)
            
        }
    } catch (error) {
        next(404, 'Server error from Veify Acount for Forgot Password!')
        res.send(error)
    }
}


/**
 * @access Public
 * @routes api/user/changepass
 * @method POST
 */

 export const changePassword= async (req, res, next) => {

    // Verification code from user
    const {newpass, confirmpass, id} = req.body

    console.log(req.body);

   try {


        const salt = await bcrypt.genSalt(10)
        const hasNewPass = await bcrypt.hash(confirmpass, salt)

        const updateUserPass = await Users.findByIdAndUpdate(id, {
            password : hasNewPass
        })
        res.json(updateUserPass)

   } catch (error) {
    next(customError(404, 'Incorrect Verification Code'))
   }


}



