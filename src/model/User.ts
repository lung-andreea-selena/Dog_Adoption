export interface User {
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
