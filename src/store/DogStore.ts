import {create} from 'zustand';
import {Dog} from '../model/Dog';

//the interface defines the shape of the state managed by useDogStore hook and it includes properties
interface useDogStoreProps {
    opened: boolean; //init state prop
    handleOpen: (dog?: Dog) => void; //function
    dogs: Dog[]; //isp
    deleteDog: (dogId: number) => void; //function
    addDog: (dog: Dog) => void; //function
    selectedDog: Dog; //isp
    handleClose: () => void; //function
    editDog: (dog: Dog) => void; //function
    setDogs: (dogs: Dog[]) => void;
}

//defining the custom hook
const useDogStore = create<useDogStoreProps>((set) => ({
    //it takes a function as an argument which receives a `set` function
    //inside this function an object representing the initial state and the actions to update the state is defined
    opened: false,
    selectedDog: {} as Dog,
    handleOpen: (dog?: Dog) => set({opened: true, selectedDog: dog}),
    //function that updates the state by mapping over the dogs array and replacing the dog by mathing the ids
    editDog: (dog: Dog) => {
        set((state) => ({
            dogs: state.dogs.map((d) => (d.getId === dog.getId ? dog : d)), //iterate over each dog in dogs array and check if id matches it changes, if not it will not
        }));
    },
    handleClose: () => set({opened: false, selectedDog: {} as Dog}),
    dogs: DogList, //initial state of the list of dogs fetched from an API

    //inde-out: the spread operator (...) is used to create a new array that contains all the elements from the existing state.dogs array and the new `dog` obj passed as an argument is appended to this array
    //then is created a new obj literal where the `dogs` property is assigned the new array
    //this object is then passed to set, which updates the state by replacing the entire dogs array with the new array
    addDog: (dog: Dog) => set((state) => ({dogs: [...state.dogs, dog]})),
    deleteDog: (dogId: number) =>
        //This expression filters the state.dogs array to remove the dog with the dogId specified in the function argument.
        // It iterates over each d in the array and returns only those where the id does not match the dogId being deleted
        set((state) => ({dogs: state.dogs.filter((d) => d.id !== dogId)})),
    setDogs: (dogs: Dog[]) => set(() => ({dogs: [...dogs]})),
}));
export default useDogStore;
