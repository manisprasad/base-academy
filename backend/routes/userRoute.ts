import express from "express";
import {
  getUserById,
  updateUserProfile,
  deleteUserProfile,
  getAllUsers,
} from "../controller/userController";

import verifyJWT from "../middleware/verifyJWT";
import verifyRole from "../middleware/verifyRoles";
import { Roles } from "../config/roleList";

export const userRouter = express.Router();

//Get all users
// Only accessible by teachers/admins
userRouter.get('/admin', verifyJWT, verifyRole(Roles.Teacher), getAllUsers);

// User profile routes
// These routes are accessible by the user themselves or by teachers/admins
userRouter.get('/admin/get-user/:id', verifyJWT, verifyRole(Roles.Teacher), getUserById);
userRouter.get('/', verifyJWT, getUserById);

// Update user profile
// Accessible by the user themselves or by teachers/admins
userRouter.put('/admin/update-user/:id', verifyJWT, verifyRole(Roles.Teacher), updateUserProfile);
userRouter.put('/', verifyJWT, updateUserProfile);

// Delete user profile
// Only accessible by teachers/admins
userRouter.delete('/admin/delete-user/:id', verifyJWT, verifyRole(Roles.Teacher), deleteUserProfile);

