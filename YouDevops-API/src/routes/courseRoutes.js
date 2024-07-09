import express from 'express';
import multer from 'multer';
import path from 'path';
import { getAllCoursesHandler, addCoursesHandler, deleteCourseHandler, getCourseByIdHandler, countCoursesHandler, updateCourseHandler } from '../controllers/courseController.js';


const routerCourse = express.Router();



const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads');
    },
    filename: function (req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});



const upload = multer({ storage: storage });

console.log('routa:', upload);


routerCourse.get('/courses', getAllCoursesHandler);
routerCourse.post('/addCourses', upload.single('image'), addCoursesHandler);
routerCourse.get('/courses', getAllCoursesHandler);
routerCourse.delete('/deleteCourse/:id', deleteCourseHandler);
routerCourse.get('/courses/:id', getCourseByIdHandler);
routerCourse.get('/countCourses', countCoursesHandler);
routerCourse.put('/updateCourse/:id',upload.single('image'), updateCourseHandler);


export default routerCourse;