import logger from "../config/logger.js";
import { fileURLToPath } from 'url';
import fsExtra from 'fs-extra';
import path from 'path';
import { findAllCourses, addCourseToDB, deleteCourse, getCourseById, countCourses, updateCourse } from "../models/courseModel.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("dirname", __dirname);
console.log("filename", __filename);

const getAllCoursesHandler = async (req, res) => {
    try {
        const courses = await findAllCourses();
        res.json(courses);
    } catch (err) {
        logger.error(err);
        res.status(500).send('Error retrieving courses');
    }
};

const getCourseByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await getCourseById(id);
        if (!course) {
            return res.status(404).send('Course not found');
        }
        res.json(course);
    } catch (err) {
        logger.error(err);
        res.status(500).send('Error retrieving course');
    }

}
const addCoursesHandler = async (req, res) => {
    try {

        console.log('Request received:', req.body);
        console.log('File received:', req.file);

        if (!req.file) {
            return res.status(400).send('No image was uploaded.');
        }

        const { titulo, descripcion, categorias_id } = req.body;
        const image = req.file;
        const imagePath = path.join(__dirname, '../../uploads', image.filename);

        console.log('Saving course with:', { titulo, descripcion, categorias_id, imagePath });

        const course = await addCourseToDB({ titulo, descripcion, categorias_id, rutaImagen: imagePath });
        res.json(course);
    } catch (err) {
        console.error('Error creating course:', err);
        res.status(500).send('Error creating course.');
    }
};

const deleteCourseHandler = async (req, res) =>{
    try{
        const { id } = req.params;
        const result = await deleteCourse(id);
        
        if(result.rowCount === 0){ 
            return res.status(404).send('Course not found');
        }

        res.status(200).send('Course deleted');
    }catch(err){
        logger.error(err);
        res.status(500).send('Error deleting course');
    }
}

const countCoursesHandler = async (req, res) => {
    try {
        const count = await countCourses();
        res.json(count);
    } catch (err) {
        logger.error(err);
        res.status(500).send('Error retrieving courses');
    }
};

const updateCourseHandler = async (req, res) => {
    try {
        console.log('File received:', req.file);
        const { id } = req.params;

        const { titulo, descripcion, categorias_id } = req.body;

        const existingCourse = await getCourseById(id);

        if (!existingCourse) {
            return res.status(404).send('Course not found.');
        }

        let image = req.file;
        const imagePath = path.join(__dirname, '../../uploads', image.filename);

        console.log('imagePath:', imagePath);
        const updatedCourse = await updateCourse({ id, titulo, descripcion, categorias_id, rutaImagen: imagePath });
        res.json(updatedCourse);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating course');
    }
};


export { findAllCourses, getAllCoursesHandler, addCourseToDB, addCoursesHandler, deleteCourseHandler,getCourseByIdHandler, countCoursesHandler, countCourses};
export { updateCourseHandler, updateCourse};
