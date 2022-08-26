import express from "express";
import { createUser, deleteUser, getAllUsers, getsingelUser, updateUser } from "../controllers/userController.js";

const router = express.Router()




router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getsingelUser).put(updateUser).patch(updateUser).delete(deleteUser)



// Export Router
export default router;