import {Request, Response} from 'express';
import {UserRepository} from '../repository/UserRepo';
import {UserModel, UserType} from '../models/User';

export const users = new UserRepository();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const allUsers = await users.getUsers();
        res.json(allUsers);
    } catch (error) {
        console.error('Error getting users:', error);
        return res.status(400).json({message: 'Error getting users'});
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const user = await UserModel.findById({Uid: id});
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error getting user:', error);
        return res.status(400).json({message: 'Error getting user'});
    }
};

export const addUser = async (req: Request, res: Response) => {
    try {
        const {name, age, email, password, type} = req.body;
        const newUser = {
            name: name,
            age: age,
            email: email,
            password: password,
            type: type as UserType,
        };
        users.addUser(newUser);
        return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error adding user: ', error);
        return res.status(400).json({message: 'Error adding user'});
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = UserModel.findById({Uid: id});
    const {name, age, email, password, type} = req.body;
    try {
        if (!name || !age || !email || !password || !type || isNaN(age)) {
            return res.status(400).json({message: 'Invalid user data'});
        } else {
            if (await user) {
                const updatedUser = await UserModel.updateOne(
                    {Uid: id},
                    {
                        name: name,
                        age: age,
                        email: email,
                        password: password,
                        type: type as UserType,
                    },
                );
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({message: 'User not found'});
            }
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(400).json({message: 'Error updating user'});
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = UserModel.findOne({Uid: id});
    try {
        if (user) {
            await user.deleteOne();
            res.send('User deleted successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(400).json({message: 'Error deleting user'});
    }
};
