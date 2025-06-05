import { Router } from 'express';
import viewsController from '../controllers/views.controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('bienvenida');
})

router.get('/users',  viewsController.getAllUsers);

router.get('/pets',  viewsController.getAllPets);

export default router;