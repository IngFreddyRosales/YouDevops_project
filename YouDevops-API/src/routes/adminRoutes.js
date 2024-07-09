import express from 'express';
import { loginAdminHandler, getAdminTableHandler } from '../controllers/adminController.js';


const routerAdmin = express.Router();

routerAdmin.post('/adminLogin', loginAdminHandler);
routerAdmin.get('/adminTable', getAdminTableHandler )

export default routerAdmin;