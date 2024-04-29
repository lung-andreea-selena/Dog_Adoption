export interface Dog {
    Did: number;
    name: string;
    breed: DogBreed;
    description: string;
    imageUrl: string;
    age: number;
    owner: string;
}

export enum DogBreed {
    BICHON = 'Bichon',
    LABRADOR = 'Labrador',
    HUSKY = 'Husky',
    PITBULL = 'Pitbull',
    GOLDEN_RETRIEVER = 'Golden Retriever',
    BERNESE = 'Bernese',
    GERMAN_SHEPHERD = 'German Shepherd',
    CHIHUAHUA = 'Chihuahua',
    DALMATIAN = 'Dalmatian',
    CHOWCHOW = 'Chow Chow',
    BEAGLE = 'Beagle',
}
