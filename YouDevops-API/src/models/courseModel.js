import { text } from "express";
import client from "../config/database.js";
import logger from "../config/logger.js";

const createCourse = async (titulo, descripicion, categorias_id, rutaImagen) => {

    const query = 'INSERT INTO cursos (titulo, descripcion, categorias_id, rutaImagen) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [titulo, descripicion, categorias_id, rutaImagen];
    const result = await client.query(query, values);
    logger.info(`Course with ID ${result.rows[0].id} created`);
    return result.rows[0];
};

const getCourseById = async (id) => {
    try {
        const query = {
            text: 'SELECT * FROM cursos WHERE id = $1',
            values: [id]
        };
        const { rows } = await client.query(query);
        return rows[0];
    } catch (err) {
        logger.error(err);
    }
};



const addCourseToDB = async ({ titulo, descripcion, categorias_id, rutaImagen }) => {
    try {
        const query = {
            text: 'INSERT INTO cursos (titulo, descripcion, categorias_id, rutaImagen) VALUES ($1, $2, $3, $4) RETURNING *',
            values: [titulo, descripcion, categorias_id, rutaImagen]
        };

        const result = await client.query(query);
        console.log('Course added:', result.rows[0])
        return result.rows[0];
    } catch (err) {
        logger.error(err);
    }
};

const findAllCourses = async () => {
    try {
        const query = 'SELECT * FROM cursos';
        const {rows} = await client.query(query);
        return rows;
    } catch (err) {
        logger.error(err);
    }
};

const deleteCourse = async (id) => {
    try {
        const query = {
            text: 'DELETE FROM cursos WHERE id = $1',
            values: [id]
        };
        const result = await client.query(query);
        return result;
    } catch (err) {
        logger.error(err);
    }
};

const countCourses = async () => {
    try {
        const query = 'SELECT COUNT(*) FROM cursos';    
        const { rows } = await client.query(query);
        return rows[0];
    } catch (err) {
        logger.error(err);
    }
};

const updateCourse = async ({id,titulo, descripcion, categorias_id, rutaImagen}) => {
    try {

        console.log('Estoy en el modelo:', id, titulo, descripcion, categorias_id, rutaImagen)
        const query = {
            text: 'UPDATE cursos SET titulo = $1, descripcion = $2, categorias_id = $3, rutaimagen = $4 WHERE id = $5 RETURNING *',
            values: [titulo, descripcion, categorias_id, rutaImagen,id]
        };
        const result = await client.query(query);
        return result.rows[0];
    } catch (err) {
        logger.error(err);
    }
};
export { createCourse, findAllCourses, addCourseToDB, deleteCourse, getCourseById, countCourses, updateCourse };