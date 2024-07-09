import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Client } = pkg;

const password = process.env.DB_PASSWORD;
if(typeof password !== 'string'){
    throw new Error('No se ha definido la variable de entorno DB_PASSWORD');
}	

console.log('DB_PASSWORD:' ,process.env.DB_PASSWORD);
const dbConfig = {/* Configuracion de la bases de datos */
   host : process.env.DB_HOST,
   port : process.env.DB_PORT,
   user : process.env.DB_USER,
   password : process.env.DB_PASSWORD,
   database: process.env.DB_NAME 
};

const client = new Client(dbConfig);

client.connect()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error de conexion', err.stack));

export default client;