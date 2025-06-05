import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import viewRouter from './routes/view.router.js';

import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';

const app = express();
const PORT = process.env.PORT||8080;
const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://coderuser:Hsiu8LrVRlpeSzAI@cluster0.b6out72.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connection = mongoose.connect(MONGO_URL);

console.log(__dirname+'routes/*.js');

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'API AdoptMe',
            version: '1.0.0',
            description: 'Documentación de la API AdoptMe'
        }
    },
    apis: [`${__dirname}/routes/*.js`], // Aquí busca los comentarios JSDoc
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

//Configuración del motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec)); //Si no queremos usar comentarios ponemos const swaggerSpec = YAML.load( path.join(__dirname, 'docs', 'swagger.yaml') );

app.use(express.json());
app.use(cookieParser());

app.use('/',viewRouter);
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
