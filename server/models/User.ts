/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose, {Document, Schema} from 'mongoose';

const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IUser extends Document {
    Uid: number;
    name: string;
    age: number;
    email: string;
    password: string;
    type: UserType;
}

export enum UserType {
    user = 'user',
    manager = 'manager',
    admin = 'admin',
}
const UserSchema: Schema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, required: true, enum: Object.values(UserType)},
});
UserSchema.plugin(AutoIncrement, {inc_field: 'Uid'});
export const UserModel = mongoose.model<IUser>('users', UserSchema);
