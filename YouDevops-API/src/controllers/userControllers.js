import logger from '../config/logger.js';
import {getUsers,getUserById, countUser} from '../models/userModel.js';
import { createUser, updateUser, deleteUserFromData, getUserByCredentials} from '../models/userModel.js';
import { validateUser } from '../schemas/userZod.js';

/* para que sirve los fetch users?
    R: Para obtener los usuarios,
    R: Para obtener un usuario por id,
    R: Para obtener un usuario por nombre,
    */
   
const fetchUsers = async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);/* Porque usa propiedad .json? R: Para enviar una respuesta en formato json */

    } catch ( err){
        res.status(500).json({error: err.message});/* Error 500 Internal Server Error es un estado HTTP  */
    }
};

const fetchUserById = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (user){
            res.json(user);
        } else {
            res.status(404).json({error: 'User not found'}); /* Error 404 Not Found*/
        }
    }catch (err){
        res.status(500).json({error: err.message});
    }
};

const createuserHandler = async (req, res) => {
    const result = validateUser(req.body);
    if(result.error){
        return res.status(422).json({error: JSON.parse(result.error.message)});
    }
    const {nombre, apellido, correo, contrasenia} = req.body;
    
    const newCourse = await createUser(nombre, apellido, correo, contrasenia);
    res.status(201).json(newCourse);
};

const updateUserHandler = async (req, res) =>{

    try{
        let id = req.params.id;
        const { nombre, apellido, correo, contrasenia } = req.body;
        let data = {nombre, apellido, correo, contrasenia};
        const updateUserVal = await updateUser(id,data);
        if(updateUserVal){
            res.status(200).json(updateUserVal);
        } else{
            res.status(404).json({error: 'User not found'});
        }
    }catch(err){
        res.status(500).json({error: err.message});
    };
};

const deleteUserHandler = async (req, res) => {
    const {id} = req.params;
    try{
        const deleteUser = await deleteUserFromData(id);
        if(deleteUser){
            res.json({message: 'User deleted'});
        }else{
            res.status(404).json({error: 'User not found'});
        }

    }catch(err){
        logger.error(err);
        res.status(500).json({error: err.message});
    }

};

const loginUserHandler = async (req, res) => {

    const {nombre, contrasenia} = req.body;


    try{
        const user = await getUserByCredentials(nombre, contrasenia);

        if(user){
            logger.info(`User with email ${nombre} logged in`);
            res.status(200).json(user);
        } else{
            logger.error(`User with email ${nombre} not found`);
            res.status(404).json({error: 'User not found'});
        }
    } catch(err){
        logger.error('Error logging in user', err);
        res.status(500).json({message: 'Error logging in user'});
    }
};

const countUserHandler = async (req, res) => {
    try {
        const users = await countUser();
        res.json(users);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export {fetchUsers, fetchUserById};
export {createuserHandler, createUser, updateUserHandler, updateUser, deleteUserHandler, deleteUserFromData };
export {loginUserHandler, getUserByCredentials, countUserHandler};
