import {Request, Response} from 'express';
import http from 'http';
import {dogs} from '../store/DogStore';
import {Dog, DogBreed} from '../model/Dog';

export const getDogs = async (req: Request, res: Response) => {
    res.json(dogs);
    // try {
    //     await connectDB();
    //     const query = 'SELECT * FROM Dog';
    //     const result = await sql.query(query);
    //     res.json(result.recordset);
    // } catch (error) {
    //     console.error('Error fetching dogs:', error);
    //     res.status(500).json({error: 'Internal Server Error'});
    // } finally {
    //     await closeDB();
    // }
};

export const getDogById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const dog = dogs.find((dog) => dog.id === id);
    if (dog) {
        res.json(dog);
    } else {
        res.status(404).send('Dog not found');
    }
};

export const addDog = async (req: Request, res: Response) => {
    try {
        const {name, breed, description, imageUrl, age, owner, possessions} =
            req.body;
        if (!name || !breed || !description || !imageUrl || !age || !owner) {
            return res.status(400).json({message: 'Invalid dog data'});
        } else {
            const newDog: Dog = {
                id: dogs.length + 2,
                name: name,
                breed: breed as DogBreed,
                description: description,
                imageUrl: imageUrl,
                age: age,
                owner: owner,
                possessions: possessions,
            };
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
    const dogIndex = dogs.findIndex((dog) => dog.id === id);
    if (dogIndex != -1) {
        const {name, breed, description, imageUrl, age, owner, possessions} =
            req.body;
        dogs[dogIndex] = {
            ...dogs[dogIndex],
            name: name,
            breed: breed as DogBreed,
            description: description,
            imageUrl: imageUrl,
            age: age,
            owner: owner,
            possessions: possessions,
        };
    } else {
        res.status(404).send('Dog not found');
    }
};
export const deleteDog = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = dogs.findIndex((dog) => dog.id === id);
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
