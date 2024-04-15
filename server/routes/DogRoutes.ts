import express from 'express';
import {
    addDog,
    checkInternet,
    deleteDog,
    getDogById,
    getDogs,
    updateDog,
} from '../controller/DogController';

const router = express.Router();
router.get('/dogs', getDogs);
router.get('/dogs/:id', getDogById);
router.post('/dogs', addDog);
router.put('/dogs/:id', updateDog);
router.delete('/dogs/:id', deleteDog);
router.get('/check-internet', checkInternet);

export default router;
