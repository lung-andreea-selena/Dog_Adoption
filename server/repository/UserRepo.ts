import {UserModel, IUser} from '../models/User'; // Import your Dog model

export class UserRepository {
    public async addUser(userData: unknown): Promise<IUser> {
        const user = new UserModel(userData);
        await user.save();
        return user;
    }
    public async getUsers(): Promise<IUser[]> {
        try {
            const users = await UserModel.find();
            return users;
        } catch (error) {
            console.log('Error getting users:', error);
            return [];
        }
    }
}
