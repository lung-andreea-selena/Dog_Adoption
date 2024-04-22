/* eslint-disable @typescript-eslint/no-explicit-any */
import {Request, Response} from 'express';
import request from 'supertest';
import app from '../App';
import {dogs} from '../store/DogStore';
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
            req.params = {id: '1'}; // Assuming there's a dog with ID 1 in the test data
            DogController.getDogById(req as Request, res);
            expect(res.json).toHaveBeenCalledWith(expect.any(Dog));
        });

        it('should return 404 for an invalid ID', () => {
            const res = mockResponse();
            req.params = {id: '999'};
            DogController.getDogById(req as Request, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('Dog not found'); // Updated error message
        });
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

            expect(response.body).toEqual({message: 'Invalid dog data'});
        });
    });

    describe('deleteDog', () => {
        it('should return 404 for deleting a dog that does not exist', async () => {
            const nonExistentDogId = -6; // Assuming this ID does not exist in the test data
            const response = await request(app)
                .delete(`/api/dogs/${nonExistentDogId}`)
                .expect(404);
            expect(response.text).toBe('Dog not found'); // Response body is a string, not an object
        });
    });
});
