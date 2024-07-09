import express from 'express';
import { fetchUsers, fetchUserById, createuserHandler, updateUserHandler, deleteUserHandler, loginUserHandler, countUserHandler } from "../controllers/userControllers.js";

const router = express.Router();

router.get('/users', fetchUsers);
router.get('/users/:id', fetchUserById);
router.post('/signIn', createuserHandler);
router.put('/updateUser/:id', updateUserHandler);
router.delete('/deleteUser/:id', deleteUserHandler);
router.post('/login', loginUserHandler);
router.get('/countUsers', countUserHandler);


export default router;
