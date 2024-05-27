import {DogModel, IDog} from '../models/Dog'; // Import your Dog model

export class DogRepository {
    public async addDog(dogData: unknown): Promise<IDog> {
        const dog = new DogModel(dogData);
        await dog.save();
        return dog;
    }
    public async getDogs(): Promise<IDog[]> {
        try {
            const dogs = await DogModel.find();
            return dogs;
        } catch (error) {
            console.log('Error getting dogs:', error);
            return [];
        }
    }
}
