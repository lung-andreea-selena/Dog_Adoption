/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response} from 'express';
import request from 'supertest';
import app from '../App';
import {dogs} from '../DogStore';
import * as DogController from '../controller/DogController';
import {Dog} from '../model/Dog';

const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res as Response;
};

describe('DogController', () => {
    // Mocking Express request object for testing
    const req: Partial<Request> = {};

    describe('getDogs', () => {
        it('should return dogs', () => {
            const res = mockResponse();
            DogController.getDogs(req as Request, res);
            expect(res.json).toHaveBeenCalledWith(dogs);
        });
    });
    describe('getDogById', () => {
        it('should return the dog for a valid ID', () => {
            const res = mockResponse();
            req.params = {id: '1'};
            DogController.getDogById(req as Request, res);
            expect(res.json).toHaveBeenCalledWith(expect.any(Dog));
        });

        it('should return 404 for an invalid ID', () => {
            const res = mockResponse();
            req.params = {id: '999'};
            DogController.getDogById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('Expense not found');
        });
    });
    it('should add a new dog', async () => {
        const newDog = {
            name: 'Bob',
            breed: 'Bichon',
            description: 'Funnt dog',
            imageUrl:
                'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
            age: 7,
            owner: 'Bobby',
        };
        const response = await request(app)
            .post('/api/dogs')
            .send(newDog)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.breed).toBe(newDog.breed);
    });
    it('should delete an existing expense', async () => {
        const dogIdToDelete = 1;
        const response = await request(app)
            .delete(`/api/dogs/${dogIdToDelete}`)
            .expect(200);
        expect(response.text).toBe('Dog deleted successfully');
        expect(dogs).not.toContainEqual(
            expect.objectContaining({id: dogIdToDelete}),
        );
    });
    describe('addDog', () => {
        it('should return 400 for adding an invalid dog', async () => {
            const invalidDog = {
                name: 'Bobee',
                breed: 'Labrador',
                description: 'Funny dog',
                imageUrl:
                    'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*',
                age: 6,
                owner: 'Bob',
            };
            const response = await request(app)
                .post('/api/dogs')
                .send(invalidDog)
                .expect(400);

            expect(response.body).toEqual({
                message: 'Invalid dog data',
            });
        });
    });
    describe('deleteDog', () => {
        it('should return 404 for deleting an dog that does not exist', async () => {
            const nonexistedDogId = -6;
            const response = await request(app)
                .delete(`/api/dogs/${nonexistedDogId}`)
                .expect(404);
            console.log(response.body);
            expect(response.body.toEqual({}));
        });
    });
});
