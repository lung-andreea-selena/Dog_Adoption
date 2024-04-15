import {Request, Response} from 'express';
import http from 'http';
import {dogs} from '../DogStore';
import {Dog, DogBreed} from '../model/Dog';

export const getDogs = async (req: Request, res: Response) => {
    res.json(dogs);
};

export const getDogById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const dog = dogs.find((dog) => dog.getId() === id);
    if (dog) {
        res.json(dog);
    } else {
        res.status(404).send('Dog not found');
    }
};

export const addDog = async (req: Request, res: Response) => {
    try {
        const {name, breed, description, imageUrl, age, owner} = req.body;
        if (!name || !breed || !description || !imageUrl || !age || !owner) {
            return res.status(400).json({message: 'Invalid dog data'});
        } else {
            const newDog = new Dog(
                dogs.length + 2,
                name,
                breed as DogBreed,
                description,
                imageUrl,
                age,
                owner,
            );
            dogs.push(newDog);
            return res.status(201).json(newDog);
        }
    } catch (error) {
        console.error('Error adding dog: ', error);
        return res.status(400).json({message: 'Error adding dog'});
    }
};

export const updateDog = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const dog = dogs.find((dog) => dog.getId() === id);
    if (dog) {
        const {name, breed, description, imageUrl, age, owner} = req.body;
        dog.setName(name);
        dog.setBreed(breed as DogBreed);
        dog.setDescription(description);
        dog.setImage(imageUrl);
        dog.setAge(age);
        dog.setOwner(owner);
    } else {
        res.status(404).send('Dog not found');
    }
};
export const deleteDog = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = dogs.findIndex((dog) => dog.getId() === id);
    if (index > -1) {
        dogs.splice(index, 1);
        res.send('Dog deleted successfully');
    } else {
        res.status(404).send('Dog not found');
    }
};

export const checkInternet = async (req: Request, res: Response) => {
    const options = {
        hostname: 'www.google.com',
        port: 80,
        path: '/',
        method: 'GET',
    };
    const reqHttp = http.request(options, () => {
        res.json({isOnline: true});
    });
    reqHttp.on('error', () => {
        res.json({idOnline: false});
    });
    reqHttp.end();
};
