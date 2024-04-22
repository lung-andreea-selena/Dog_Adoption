import {create} from 'zustand';
import {Dog} from '../model/Dog';
import axios from 'axios';

//the interface defines the shape of the state managed by useDogStore hook and it includes properties
interface useDogStoreProps {
    opened: boolean; //init state prop
    handleOpen: (dog?: Dog) => void; //function
    handleClose: () => void; //function
    dogs: Dog[];
    deleteDog: (dog: Dog) => void; //function
    addDog: (dog: Dog) => void; //function
    selectedDog: Dog;
    editDog: (dog: Dog) => void; //function
    setDogs: (dogs: Dog[]) => void;
    handlePossessions: (dog?: Dog) => void;
}
axios.get<Dog[]>('http://localhost:3001/api/dogs').then((response) => {
    useDogStore.setState({dogs: response.data});
});
const fetchDogs = async () => {
    try {
        const response = await axios.get<Dog[]>(
            'http://localhost:3001/api/dogs',
        );
        console.log(response.data);
        useDogStore.setState({dogs: response.data});
    } catch (error) {
        console.error('Error fetching dogs ', error);
    }
};

//defining the custom hook
export const useDogStore = create<useDogStoreProps>((set) => ({
    opened: false,
    dogs: [],
    selectedDog: {} as Dog,
    handleOpen: (dog?: Dog) => set({opened: true, selectedDog: dog}),
    handleClose: () => set({opened: false, selectedDog: {} as Dog}),
    editDog: async (dog: Dog) => {
        try {
            await axios.put(`http://localhost:3001/dogs/${dog.id}`, dog);
            fetchDogs();
        } catch (error) {
            console.error('Error editing dog', error);
        }
        set((state) => ({
            dogs: state.dogs.map((d) => (d.id === dog.id ? dog : d)),
        }));
        fetchDogs();
    },
    addDog: async (dog: Dog) => {
        try {
            await axios.post(`http://localhost:3001/dogs`, dog);
            fetchDogs();
        } catch (error) {
            console.error('Error adding dog', error);
        }
        set((state) => ({
            dogs: [...state.dogs, dog],
        }));
    },
    deleteDog: async (dog: Dog) => {
        try {
            await axios.delete(`http://localhost:3001/dogs/${dog.id}`);
            fetchDogs();
        } catch (error) {
            console.error('Error deleteing dog', dog);
        }
        set((state) => ({
            dogs: state.dogs.filter((d) => d.id !== dog.id),
        }));
    },
    setDogs: (dogs: Dog[]) => set(() => ({dogs: [...dogs]})),
    handlePossessions: (dog?: Dog) => set({selectedDog: dog}),
}));
