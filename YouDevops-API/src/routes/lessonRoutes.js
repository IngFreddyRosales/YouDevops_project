import express from 'express';	
import {createLessonHandler, getAllLessonHandler, getLessonByCourseIdHandler, deleteLessonHandler, getLessonByIdHandler, updateLessonHandler} from '../controllers/lessonController.js';

const routerLesson = express.Router();

routerLesson.post('/addLessons', createLessonHandler);
routerLesson.get('/lessons', getAllLessonHandler);
routerLesson.get('/lessons/:id', getLessonByCourseIdHandler);
routerLesson.get('/lesson/:id', getLessonByIdHandler);
routerLesson.delete('/deleteLesson/:id', deleteLessonHandler);
routerLesson.put('/updateLesson/:id', updateLessonHandler);

export default routerLesson;