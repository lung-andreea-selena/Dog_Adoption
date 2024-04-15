import {create} from 'zustand';

//the interface defines the shape of the state managed by useDogStore hook and it includes properties
interface useDogStoreProps {
    opened: boolean; //init state prop
    handleOpen: (dogId?: number) => void; //function
    handleClose: () => void; //function
    //dogs: Dog[];
    //deleteDog: (dogId: number) => void; //function
    //addDog: (dog: Dog) => void; //function
    selectedDogId: number | null;
    setSelectedDogId: (dogId: number | undefined) => void; //isp
    // editDog: (dog: Dog) => void; //function
    // setDogs: (dogs: Dog[]) => void;
}

//defining the custom hook
export const useDogStore = create<useDogStoreProps>((set) => ({
    opened: false,
    handleOpen: (dogId?: number) => set({opened: true, selectedDogId: dogId}),
    handleClose: () => set({opened: false, selectedDogId: {} as number}),
    selectedDogId: null,
    setSelectedDogId: (dogId: number | undefined) =>
        set({selectedDogId: dogId}),
}));
