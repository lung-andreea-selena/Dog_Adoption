/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const express = require('express');
const dogController = require('../controller/DogController');
const possessionController = require('../controller/PossessionController');

const router = express.Router();

router.get('/dogs', dogController.getAllDogs);
router.get('/dogs/:id', dogController.getDogByID);
router.post('/dogs', dogController.createDog);
router.put('/dogs/:id', dogController.editDog);
router.delete('/dogs/:id', dogController.deleteDog);
router.get('/possessions', possessionController.getAllPossession);
router.get('/possessions/:id', possessionController.getPossessionByID);
router.post('/possessions', possessionController.createPossession);
router.put('/possessions/:id', possessionController.editPossession);
router.delete('/possessions/:id', possessionController.deletePossession);

module.exports = router;
