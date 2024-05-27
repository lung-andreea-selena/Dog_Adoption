/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose, {Document} from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);
export interface IPossession extends Document {
    Pid: number;
    dogId: number;
    title: string;
    type: PossessionType;
    description: string;
    imageUrl: string;
    instruction: string;
}
export enum PossessionType {
    TOY = 'Toy',
    CLOTHING = 'Clothing',
    COLLAR = 'Collar',
    OTHER = 'Other',
}

const PossessionSchema = new mongoose.Schema({
    dogId: {type: Number, required: true},
    title: {type: String, required: true},
    type: {type: String, enum: Object.values(PossessionType)},
    description: {type: String, required: true, maxlength: 40000},
    imageUrl: {type: String, required: true},
    instructions: {type: String, required: true},
});
PossessionSchema.plugin(AutoIncrement, {inc_field: 'Pid'});
export const PossessionModel = mongoose.model<IPossession>(
    'Possession',
    PossessionSchema,
);
