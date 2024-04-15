export class Dog {
    private id: number;
    private name: string;
    private breed: DogBreed;
    private description: string;
    private imageUrl: string;
    private age: number;
    private owner: string;
    constructor(
        id: number,
        name: string,
        breed: DogBreed,
        description: string,
        imagineUrl: string,
        age: number,
        owner: string,
    ) {
        this.id = id;
        this.name = name;
        this.breed = breed;
        this.description = description;
        this.imageUrl = imagineUrl;
        this.age = age;
        this.owner = owner;
    }
    public getId(): number {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }
    public getBreed(): DogBreed {
        return this.breed;
    }
    public getDescription(): string {
        return this.description;
    }
    public getImage(): string {
        return this.imageUrl;
    }
    public getAge(): number {
        return this.age;
    }
    public getOwner(): string {
        return this.owner;
    }
    public setId(id: number): void {
        this.id = id;
    }
    public setName(name: string): void {
        this.name = name;
    }
    public setBreed(breed: DogBreed): void {
        this.breed = breed;
    }
    public setDescription(description: string): void {
        this.description = description;
    }
    public setImage(image: string): void {
        this.imageUrl = image;
    }
    public setAge(age: number): void {
        this.age = age;
    }
    public setOwner(owner: string): void {
        this.owner = owner;
    }
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
