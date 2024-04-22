/* eslint-disable @typescript-eslint/no-explicit-any */
import {faker} from '@faker-js/faker';
import {Possession, PossessionType} from '../model/Possession';

const generateRandomPossession = () => {
    const id = faker.number.int(1000);
    const title = faker.lorem.word();
    const imageUrl = faker.image.url();
    const description = faker.lorem.sentence();
    const instructions = faker.lorem.paragraph();
    const type = faker.helpers.arrayElement(Object.values(PossessionType));

    return {
        id: id,
        title: title,
        type: type as PossessionType,
        description: description,
        imageUrl: imageUrl,
        instructions: instructions,
    };
};

export const possessions: Possession[] = Array.from(
    {length: 15},
    generateRandomPossession,
);
