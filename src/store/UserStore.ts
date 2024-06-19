import axios from 'axios';
import {create} from 'zustand';
import {User} from '../model/User';

interface useUserStoreProps {
    userOpened: boolean;
    handleOpenUser: (user?: User) => void;
    handleCloseUser: () => void;
    selectedUser: User;
    token: string;
    setToken: (token: string) => void;

    addUser: (user: unknown) => void;
    deleteUser: (uid: number) => void;
    editUser: (user: User) => void;
    users: User[];
}

const fetchUsers = async () => {
    try {
        const response = await axios.get<User[]>(
            'https://mpp-backend-dp15.onrender.com/api/users',
        );
        console.log(response.data);
        useUserStore.setState({users: response.data});
        localStorage.setItem('users', JSON.stringify(response.data));
    } catch (error) {
        console.error('Error fetching users', error);
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        useUserStore.setState({users: storedUsers});
    }
};

export const useUserStore = create<useUserStoreProps>((set) => ({
    userOpened: false,
    users: [],
    token: '',
    setToken: (token: string) => set({token}),
    selectedUser: {} as User,
    handleOpenUser: (user?: User) =>
        set({userOpened: true, selectedUser: user}),
    handleCloseUser: () => set({userOpened: false, selectedUser: {} as User}),
    editUser: async (user: User) => {
        try {
            await axios.put(
                `https://mpp-backend-dp15.onrender.com/api/users/${user.Uid}`,
                user,
            );
            fetchUsers();
        } catch (error) {
            console.error('Error editing user', error);
        }
        set((state) => ({
            users: state.users.map((u) => (u.Uid === user.Uid ? user : u)),
        }));
        //fetchUsers();
    },
    addUser: async (user: unknown) => {
        try {
            await axios.post(
                'https://mpp-backend-dp15.onrender.com/api/users',
                user,
            );
            fetchUsers();
        } catch (error) {
            console.error('Error adding user', error);
        }
    },
    deleteUser: async (Uid: number) => {
        try {
            await axios.delete(
                `https://mpp-backend-dp15.onrender.com/api/users/${Uid}`,
                {
                    params: {id: Uid},
                },
            );
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user', error);
        }
        set((state) => ({
            users: state.users.filter((u) => u.Uid !== Uid),
        }));
    },
}));
