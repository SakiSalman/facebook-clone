import express from "express";
import { createUser, deleteUser, getAllUsers, getsingelUser, registerUser, updateUser, userAuthLogin, userLogin, verifyAcount, verifyrest, verifyUser, changePassword } from "../controllers/userController.js";

const router = express.Router()




// Singel Routes
router.post('/register', registerUser)
router.post('/verifyuser', verifyUser)
router.post('/login/me', userLogin)
router.get('/me', userAuthLogin)
router.post('/forgotpassword', verifyAcount)
router.post('/resetpassword', verifyrest)
router.post('/changepas', changePassword)

// Rest Apis
router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getsingelUser).put(updateUser).patch(updateUser).delete(deleteUser)



// Export Router
export default router;