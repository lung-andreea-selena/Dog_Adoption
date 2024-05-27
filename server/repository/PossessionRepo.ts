import {PossessionModel, IPossession} from '../models/Possession'; // Import your Dog model

export class PossessionRepository {
    public async addPossession(possessionData: unknown): Promise<IPossession> {
        const dog = new PossessionModel(possessionData);
        await dog.save();
        return dog;
    }
    public async getPossessions(): Promise<IPossession[]> {
        try {
            const possessions = await PossessionModel.find();
            return possessions;
        } catch (error) {
            console.log('Error getting possessions:', error);
            return [];
        }
    }
}
