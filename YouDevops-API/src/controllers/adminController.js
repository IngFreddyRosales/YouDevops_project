import logger from '../config/logger.js';
import { getAdminByCredentials, getAdminTable } from '../models/adminModel.js';

const loginAdminHandler = async (req, res) => {
    const { nombre, contrasenia } = req.body;

    const admin = await getAdminByCredentials(nombre, contrasenia);

    if (admin){
        logger.info(`Admin with email ${nombre} logged in`);
        res.status(200).json(admin);
    }else{
        logger.error(`Admin with email ${nombre} not found`);
        res.status(404).json({error: 'Admin not found'});
    }

};

const getAdminTableHandler = async (req, res) => {
    const adminTable = await getAdminTable();
    res.json(adminTable);
}

export { loginAdminHandler , getAdminByCredentials, getAdminTableHandler, getAdminTable};