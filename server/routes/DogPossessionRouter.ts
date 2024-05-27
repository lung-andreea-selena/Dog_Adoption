import express from 'express';
import {
    addDog,
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
import {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
} from '../controller/UserController';

const router = express.Router();
router.get('/dogs', getDogs);
router.get('/dogs/:id', getDogById);
router.post('/dogs', addDog);
router.put('/dogs/:id', updateDog);
router.delete('/dogs/:id', deleteDog);
router.get('/possessions', getPossessions);
router.get('/possessions/:id', getPossessionById);
router.post('/possessions', addPossession);
router.put('/possessions/:id', updatePossession);
router.delete('/possessions/:id', deletePossession);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
export default router;
