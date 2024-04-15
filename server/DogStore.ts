import {faker} from '@faker-js/faker';
import {Dog, DogBreed} from './model/Dog';

const generateRandomDog = () => {
    const id = faker.number.int(1000);
    const name = faker.person.middleName();
    const description = faker.lorem.sentence();
    const imageUrl = faker.image.url();
    const age = faker.number.int({min: 1, max: 15});
    const owner = faker.person.lastName();

    const breed = Object.values(DogBreed);
    const randomBreedIndex = Math.floor(Math.random() * breed.length);
    const randomBreed = DogBreed[randomBreedIndex];

    return new Dog(id, name, randomBreed, description, imageUrl, age, owner);
};

export const dogs: Dog[] = Array.from({length: 11}, generateRandomDog);
