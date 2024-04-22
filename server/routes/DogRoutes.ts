import express from 'express';
import {
    addDog,
    checkInternet,
    deleteDog,
    getDogById,
    getDogs,
    updateDog,
} from '../controller/DogController';
import {
    addPossession,
    deletePossession,
    getPossessionById,
    getPossessions,
    updatePossession,
} from '../controller/PossessionController';

const router = express.Router();
router.get('/dogs', getDogs);
router.get('/dogs/:id', getDogById);
router.post('/dogs', addDog);
router.put('/dogs/:id', updateDog);
router.delete('/dogs/:id', deleteDog);
router.get('/check-internet', checkInternet);
router.get('/possessions', getPossessions);
router.get('/possessions/:id', getPossessionById);
router.post('/possessions', addPossession);
router.put('/possessions/:id', updatePossession);
router.delete('/possessions/:id', deletePossession);

export default router;
