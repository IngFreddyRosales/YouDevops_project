import express from 'express'; 
import userRoutes from './src/routes/usersRoutes.js';
import routerCourse from './src/routes/courseRoutes.js';
import routerAdmin from './src/routes/adminRoutes.js';
import routerLesson from './src/routes/lessonRoutes.js';
import logger from './src/config/logger.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api', userRoutes);
app.use('/api', routerCourse);
app.use('/api', routerAdmin);
app.use('/api', routerLesson);

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Manejador de errores
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send('Internal Server Error');
});

// Iniciar servidor
app.listen(port, function() {
    console.log(`Listening on port ${port}...`);
    logger.info('Aplicacion iniciada');
});
