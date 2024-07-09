import logger from "../config/logger.js";
import {createLesson, getAllLesson, getLessonByCourseId, deleteLesson, getLessonById, updateLesson} from "../models/lessonModel.js";

const createLessonHandler = async (req, res) => {
    try{
        const {titulo, descripcion, curso_id, urlVideo} = req.body;
        const lesson = await createLesson(titulo, descripcion, curso_id, urlVideo);
        res.json(lesson);

    }catch(err){
        logger.error(err);
        res.status(500).send('Error creating lesson');
    }
}

const getAllLessonHandler = async (req, res) => {
    try {
        const lessons = await getAllLesson();
        res.json(lessons);
    } catch (err) {
        logger.error(err);
        res.status(500).send('Error retrieving lessons');
    }
}

const getLessonByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const lessons = await getLessonById(id);
        if (!lessons) {
            return res.status(404).send('Lesson not found');
        }
        res.json(lessons);
    } catch (err) {
        logger.error(err);
        res.status(500).send('Error retrieving lesson');
    }

}

const getLessonByCourseIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const lessons = await getLessonByCourseId(id);
        if (!lessons) {
            return res.status(404).send('Lesson not found');
        }
        res.json(lessons);
    } catch (err) {
        logger.error(err);
        res.status(500).send('Error retrieving lesson');
    }
}

const deleteLessonHandler = async (req, res) =>{
    try{
        const {id} = req.params;
        const result = await deleteLesson(id);
        res.json(result);
    }catch(err){
        logger.error(err);
        res.status(500).send('Error deleting lesson');
    }

}

const updateLessonHandler = async (req, res) => {

    const { id } = req.params;
    const { titulo, descripcion, curso_id, urlvideo } = req.body;
    console.log('urlVideo', req.body);
    const result = await updateLesson(id, titulo, descripcion, curso_id, urlvideo);
    console.log(result);
    res.json(result);

    if (result.rowCount === 0) {
        return res.status(404).send('Lesson not found');
    }
}

export {createLessonHandler, createLesson, getAllLessonHandler, getAllLesson, getLessonByCourseIdHandler, getLessonByCourseId, deleteLessonHandler, deleteLesson,getLessonByIdHandler, getLessonById};
export {updateLessonHandler, updateLesson};