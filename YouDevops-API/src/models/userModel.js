import client from "../config/database.js";
import pool from "../config/database.js";
import logger from "../config/logger.js";

const getUsers = async () => {
    const query = 'select * from usuario;';
    logger.debug(`Executing query: ${query}`);
    const result = await client.query(query);
    return result.rows;
};

const getUserById = async (id) => {
    const query = 'SELECT * FROM usuario WHERE id = $1';
    const values = [id];
    logger.debug(`Executing query: ${query} with values: ${values}`);
    const result = await client.query(query, values);
    return result.rows[0];
};

const createUser = async (nombre, apellido, correo, contrasenia) => {
    const query = 'INSERT INTO usuario (nombre, apellido, correo, contrasenia) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [nombre, apellido, correo, contrasenia];
    const result = await client.query(query, values);
    logger.info(`User with ID ${result.rows[0].id} created`)
    return result.rows[0];
};

const updateUser = async (id, data) => {
    const query = `
        UPDATE usuario
        SET NOMBRE = $1, APELLIDO = $2, CORREO = $3, CONTRASENIA = $4
        WHERE ID = $5
        RETURNING *
    `;
    console.log("id:", id);
    const values = [data.nombre, data.apellido, data.correo, data.contrasenia, id];
    const result = await client.query(query, values);
    return result.rows[0];
};

const deleteUserFromData = async (id) => {
    const query = `
        DELETE FROM usuario
        WHERE ID = $1
        RETURNING *
    `;
    const values = [id];

    try {
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        logger.error(err);
    }
};

export const getUserByCredentials = async (nombre, contrasenia) => {
    const query = 'SELECT * FROM usuario WHERE nombre = $1 AND contrasenia = $2';
    const values = [nombre, contrasenia];

    const { rows } = await client.query(query, values);/* Aqui estoy usando el client, pero puedo hacer la prueba con el pool */
    return rows[0];
};

const countUser = async () => {
    try{
        const query = 'SELECT COUNT(*) FROM usuario';
        const result = await client.query(query);
        return result.rows[0];
    }catch(err){
        logger.error(err);
    }
};

export { getUsers, getUserById, createUser, updateUser, deleteUserFromData, countUser };