import express from "express";
import { createUser, deleteUser, getAllUsers, getsingelUser, registerUser, updateUser, userLogin, verifyAcount, verifyUser } from "../controllers/userController.js";

const router = express.Router()




// Singel Routes
router.post('/register', registerUser)
router.post('/verifyuser', verifyUser)
router.post('/login/me', userLogin)
router.post('/forgotpassword', verifyAcount)

// Rest Apis
router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getsingelUser).put(updateUser).patch(updateUser).delete(deleteUser)



// Export Router
export default router;