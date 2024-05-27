import {Request, Response} from 'express';
import {PossessionModel, PossessionType} from '../models/Possession';
import {PossessionRepository} from '../repository/PossessionRepo';

export const possessions = new PossessionRepository();

export const getPossessions = async (req: Request, res: Response) => {
    try {
        const allPossession = await possessions.getPossessions();
        res.json(allPossession);
    } catch (error) {
        console.error('Error getting possessions:', error);
        return res.status(400).json({message: 'Error getting possessions'});
    }
};

export const getPossessionById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const possession = await PossessionModel.findById({Pid: id});
    if (possession) {
        res.status(200).json(possession);
    } else {
        res.status(404).send('Possession not found');
    }
};

export const addPossession = async (req: Request, res: Response) => {
    try {
        const {dogId, title, type, description, imageUrl, instructions} =
            req.body;
        if (
            !dogId ||
            !title ||
            !type ||
            !description ||
            !imageUrl ||
            !instructions
        ) {
            return res.status(400).json({message: 'Invalid possession data'});
        } else {
            const newPossession = {
                dogId: dogId,
                title: title,
                type: type as PossessionType,
                description: description,
                imageUrl: imageUrl,
                instructions: instructions,
            };
            possessions.addPossession(newPossession);
            return res.status(201).json(newPossession);
        }
    } catch (error) {
        console.error('Error adding possession: ', error);
        return res.status(400).json({message: 'Error adding possession'});
    }
};

export const updatePossession = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const possession = PossessionModel.findOne({Pid: id});
    const {dogId, title, type, description, imageUrl, instructions} = req.body;
    if (
        !dogId ||
        !title ||
        !type ||
        !description ||
        !imageUrl ||
        !instructions
    ) {
        return res.status(400).json({message: 'Invalid possession data'});
    } else {
        if (await possession) {
            const updatedPossession = await PossessionModel.updateOne(
                {Pid: id},
                {
                    dogId: dogId,
                    title: title,
                    type: type as PossessionType,
                    description: description,
                    imageUrl: imageUrl,
                    instructions: instructions,
                },
            );
            res.status(200).json(updatedPossession);
        } else {
            res.status(404).json({message: 'Possession not found'});
        }
    }
};
export const deletePossession = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const possession = PossessionModel.findOne({Pid: id});
    if (possession) {
        await possession.deleteOne();
        res.send('Possession deleted successfully');
    } else {
        res.status(404).send('Possession not found');
    }
};
