import client from "../config/database.js";

export const getAdminByCredentials = async (nombre, contrasenia) => {
    const query = 'SELECT * FROM administrador WHERE nombre = $1 AND contrasenia = $2';
    const values = [nombre, contrasenia];

    const result = await client.query(query, values);
    return result.rows[0];
};

export const getAdminTable = async () => {
    const query = 'SELECT * FROM administrador';
    const result = await client.query(query);
    return result.rows;
}

