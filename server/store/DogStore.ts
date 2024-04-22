/* eslint-disable @typescript-eslint/no-explicit-any */
import {faker} from '@faker-js/faker';
import {Dog, DogBreed} from '../model/Dog';
import {possessions} from './PossessionStore';

const generateRandomDog = () => {
    const id = faker.number.int(1000);
    const name = faker.person.middleName();
    const description = faker.lorem.sentence();
    const imageUrl = faker.image.url();
    const age = faker.number.int({min: 1, max: 15});
    const owner = faker.person.lastName();
    const breed = faker.helpers.arrayElement(Object.values(DogBreed));

    return {
        id: id,
        name: name,
        breed: breed as DogBreed,
        description: description,
        imageUrl: imageUrl,
        age: age,
        owner: owner,
        possessions: possessions,
    };
};

export const dogs: Dog[] = Array.from({length: 11}, generateRandomDog);
