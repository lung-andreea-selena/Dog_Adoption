import express from 'express';
import {
    addPossession,
    checkInternet,
    deletePossession,
    getPossessionById,
    getPossessions,
    updatePossession,
} from '../controller/PossessionController';

const router = express.Router();
router.get('/dogs/possessions', getPossessions);
router.get('/dogs/possessions/:id', getPossessionById);
router.post('/dogs/possessions', addPossession);
router.put('/dogs/possessions/:id', updatePossession);
router.delete('/dogs/possessions/:id', deletePossession);
router.get('/dogs/check-internet', checkInternet);

export default router;
