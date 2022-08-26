
import Users from "../model/userModel.js";
import { customError } from "./errorController.js";
import bcrypt from 'bcryptjs'
import { sendEMail } from "../Utility/sendemail.js";
import Token from "../model/Token.js";

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

        console.log(req.body);
    
            // Has Password When Creating Data
            const salt = await bcrypt.genSalt(10);
            const has_pass = await bcrypt.hash(req.body.pass, salt)

    try {

       const data = await Users.create({
            ...req.body,
            password : has_pass
        })

        // create random code
         const verifycode = Math.floor(100000 + Math.random() * 900000)       
         
         const token = await Token.create()

         sendEMail(req.body.email, 'Verify Account', `verifycode`)


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

    const id = req.params.id

    try {

        const User = await Users.findByIdAndDelete(id)

        res.status(200).json(User)



    } catch (error) {
        next(error)
    }
}


// Login & Register Controller for Users



