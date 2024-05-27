/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response} from 'express';
import {DogBreed, DogModel} from '../models/Dog';
import {DogRepository} from '../repository/DogRepo';

export const dogs = new DogRepository();

export const getDogs = async (req: Request, res: Response) => {
    try {
        const allDogs = await dogs.getDogs();
        res.json(allDogs);
    } catch (error) {
        console.error('Error getting dogs:', error);
        return res.status(400).json({message: 'Error getting dogs'});
    }
};

export const getDogById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const dog = await DogModel.findById({Did: id});
    if (dog) {
        res.status(200).json(dog);
    } else {
        res.status(404).send('Dog not found');
    }
};

export const addDog = async (req: Request, res: Response) => {
    try {
        const {name, breed, description, imageUrl, age, owner} = req.body;
        const newDog = {
            name: name,
            breed: breed as DogBreed,
            description: description,
            imageUrl: imageUrl,
            age: age,
            owner: owner,
        };
        dogs.addDog(newDog);
        return res.status(201).json(newDog);
    } catch (error) {
        console.error('Error adding dog: ', error);
        return res.status(400).json({message: 'Error adding dog'});
    }
};
export const updateDog = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const dog = DogModel.findOne({Did: id});
    const {name, breed, description, imageUrl, age, owner} = req.body;
    if (
        !name ||
        !breed ||
        !description ||
        !imageUrl ||
        !age ||
        !owner ||
        isNaN(age)
    ) {
        return res.status(400).json({message: 'Invalid dog data'});
    } else {
        if (await dog) {
            const updatedDog = await DogModel.updateOne(
                {Did: id},
                {
                    name: name,
                    breed: breed as DogBreed,
                    description: description,
                    imageUrl: imageUrl,
                    age: age,
                    owner: owner,
                },
            );
            res.status(200).json(updatedDog);
        } else {
            res.status(404).json({message: 'Dog not found'});
        }
    }
};

export const deleteDog = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const dog = DogModel.findOne({Did: id});
    if (dog) {
        await dog.deleteOne();
        res.send('Dog deleted successfully');
    } else {
        res.status(404).send('Dog not founddd');
    }
};
