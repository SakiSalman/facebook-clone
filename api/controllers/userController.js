
import Users from "../model/userModel.js";
import customError from "./errorController.js";
import bcrypt from 'bcryptjs'
import { sendEMail } from "../Utility/sendemail.js";
import Token from "../model/Token.js";
import { isEmail } from "../Utility/checkEmail.js";
import { isCell } from "../Utility/checkCell.js";

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
                    message : 'Acount Not Verified!',
                 })
            }
            if (user) {

                // check apassword
                const passwordCheck = await bcrypt.compare(password, user.password)
                if (passwordCheck) {

                        // Check user Verified
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
              if (user.isVerified) {

                   res.json(user)
               
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
            next(404, 'Server error from User Login!')
        }
}

