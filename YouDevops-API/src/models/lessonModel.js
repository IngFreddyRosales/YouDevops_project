import client from "../config/database.js";
import logger from "../config/logger.js";

const createLesson = async (titulo, descripcion, curso_id, urlVideo) => {
    const query = 'INSERT INTO leccion (titulo, descripcion, curso_id, urlvideo) VALUES ($1, $2, $3, $4) RETURNING *';   
    const values = [titulo, descripcion, curso_id, urlVideo];
    const result = await client.query(query, values);
    logger.info(`Lesson with ID ${result.rows[0].id} created`);
    return result.rows[0];
};

const getAllLesson = async () => {
    try {
        const query = 'SELECT * FROM leccion';
        const {rows} = await client.query(query);
        return rows;
    } catch (err) {
        logger.error(err);
    }
};

const getLessonById = async (id) => {
    try {
        const query = {
            text: 'SELECT * FROM leccion WHERE id = $1',
            values: [id]
        };
        const { rows } = await client.query(query);
        return rows[0];
    } catch (err) {
        logger.error(err);
    }

}

const getLessonByCourseId = async (id) => {
    try {
        const query = {
            text: 'SELECT * FROM leccion WHERE curso_id = $1',
            values: [id]
        };
        const { rows } = await client.query(query);
        return rows;
    } catch (err) {
        logger.error(err);
    }
}

const deleteLesson = async (id) => {
    try {
        const query = {
            text: 'DELETE FROM leccion WHERE id = $1',
            values: [id]
        };
        const result = await client.query(query);

        return result;
    } catch (err) {
        logger.error(err);
    }
}

const updateLesson = async (id, titulo, descripcion, curso_id, urlVideo) => {
    try {
        const query = {
            text: 'UPDATE leccion SET titulo = $1, descripcion = $2, curso_id = $3, urlvideo = $4 WHERE id = $5 RETURNING *',
            values: [titulo, descripcion, curso_id, urlVideo, id]
        };
        const result = await client.query(query);
        return result.rows[0];
    } catch (err) {
        logger.error(err);
    }
};

export {createLesson, getAllLesson, getLessonByCourseId, deleteLesson, getLessonById, updateLesson};  