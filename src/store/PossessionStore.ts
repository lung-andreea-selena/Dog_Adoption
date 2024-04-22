import {create} from 'zustand';
import {Possession} from '../model/Possession';
import axios from 'axios';

//the interface defines the shape of the state managed by useDogStore hook and it includes properties
interface usePossessionStoreProps {
    opened: boolean; //init state prop
    handleOpen: (possession?: Possession) => void; //function
    handleClose: () => void; //function
    possessions: Possession[];
    deletePossesion: (possession: Possession) => void; //function
    addPossession: (possession: Possession) => void; //function
    selectedPossession: Possession;
    editPossession: (possession: Possession) => void; //function
    setPosessions: (possessions: Possession[]) => void;
}
axios
    .get<Possession[]>('http://localhost:3001/api/possessions')
    .then((response) => {
        usePossessionStore.setState({possessions: response.data});
    });
const fetchPossessions = async () => {
    try {
        const response = await axios.get<Possession[]>(
            'http://localhost:3001/api/possessions',
        );
        console.log(response.data);
        usePossessionStore.setState({possessions: response.data});
    } catch (error) {
        console.error('Error fetching possessions ', error);
    }
};

//defining the custom hook
export const usePossessionStore = create<usePossessionStoreProps>((set) => ({
    opened: false,
    possessions: [],
    selectedPossession: {} as Possession,
    handleOpen: (possession?: Possession) =>
        set({opened: true, selectedPossession: possession}),
    handleClose: () =>
        set({opened: false, selectedPossession: {} as Possession}),
    editPossession: async (possession: Possession) => {
        try {
            await axios.put(
                `http://localhost:3001/possessions/${possession.id}`,
                possession,
            );
            fetchPossessions();
        } catch (error) {
            console.error('Error editing possession', error);
        }
        set((state) => ({
            possessions: state.possessions.map((p) =>
                p.id === possession.id ? possession : p,
            ),
        }));
        fetchPossessions();
    },
    addPossession: async (possession: Possession) => {
        try {
            await axios.post(`http://localhost:3001/possessions`, possession);
            fetchPossessions();
        } catch (error) {
            console.error('Error adding possession', error);
        }
        set((state) => ({
            possessions: [...state.possessions, possession],
        }));
    },
    deletePossesion: async (possession: Possession) => {
        try {
            await axios.delete(
                `http://localhost:3001/possessions/${possession.id}`,
            );
            fetchPossessions();
        } catch (error) {
            console.error('Error deleteing possession', possession);
        }
        set((state) => ({
            possessions: state.possessions.filter(
                (p) => p.id !== possession.id,
            ),
        }));
    },
    setPosessions: (posessions: Possession[]) =>
        set(() => ({possessions: [...posessions]})),
}));
