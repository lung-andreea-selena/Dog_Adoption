/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose, {Document} from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);
export interface IDog extends Document {
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

const DogSchema = new mongoose.Schema({
    name: {type: String, required: true},
    breed: {type: String, enum: Object.values(DogBreed)},
    description: {type: String, required: true, maxlength: 40000},
    imageUrl: {type: String, required: true},
    age: {type: Number, required: true},
    owner: {type: String, required: true},
});
DogSchema.plugin(AutoIncrement, {inc_field: 'Did'});
export const DogModel = mongoose.model<IDog>('Dog', DogSchema);
