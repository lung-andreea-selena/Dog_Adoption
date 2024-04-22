import {Request, Response} from 'express';
import http from 'http';
import {possessions} from '../store/PossessionStore';
import {Possession, PossessionType} from '../model/Possession';

export const getPossessions = async (req: Request, res: Response) => {
    res.json(possessions);
};

export const getPossessionById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const possession = possessions.find((possession) => possession.id === id);
    if (possession) {
        res.json(possession);
    } else {
        res.status(404).send('Possession not found');
    }
};

export const addPossession = async (req: Request, res: Response) => {
    try {
        const {title, type, description, imageUrl, instructions} = req.body;
        if (!title || !type || !description || !imageUrl || !instructions) {
            return res.status(400).json({message: 'Invalid possession data'});
        } else {
            const newPossession: Possession = {
                id: possessions.length + 2,
                title: title,
                type: type as PossessionType,
                description: description,
                imageUrl: imageUrl,
                instructions: instructions,
            };
            possessions.push(newPossession);
            return res.status(201).json(newPossession);
        }
    } catch (error) {
        console.error('Error adding possession: ', error);
        return res.status(400).json({message: 'Error adding possession'});
    }
};

export const updatePossession = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const possessionIndex = possessions.findIndex(
        (possession) => possession.id === id,
    );
    if (possessionIndex != -1) {
        const {title, type, description, imageUrl, instructions} = req.body;
        possessions[possessionIndex] = {
            ...possessions[possessionIndex],
            title: title,
            type: type as PossessionType,
            description: description,
            imageUrl: imageUrl,
            instructions: instructions,
        };
    } else {
        res.status(404).send('Possession not found');
    }
};
export const deletePossession = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = possessions.findIndex((possession) => possession.id === id);
    if (index > -1) {
        possessions.splice(index, 1);
        res.send('Possession deleted successfully');
    } else {
        res.status(404).send('Possession not found');
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
