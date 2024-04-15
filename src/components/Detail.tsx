import {Grid, TextField, Typography} from '@mui/material';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Dog} from '../model/Dog';
import {useDogStore} from '../store/DogStore';

const Detail = () => {
    // //useParams() it retrives the parameters defined in the URL and returns them
    // //in our case const params contains the id of the dog that we are viewing in that moment
    // const params = useParams();

    // // initializes a state variable named dog using the useState hook from React
    // //setDog is a function used to update the dog state
    // //it assigns the first element of the array returned by useState to dog(undifined in this case), and the second element to setDog
    // //<Dog | undefined> specifies the type of the state variable, it can hold Dog or undefined
    // const [dog, setDog] = useState<Dog | undefined>(undefined);

    // //useDogStore is a cutom hook
    // // It retrieves the dogs variable from the context provided by the DogStore
    // const {dogs} = useDogStore();

    // //check if the id retrieved from url (in params) exists
    // //if exists it searches through the dogs array to find the dog with that id.
    // //if a matching dog is found, it updates the dog state variable with the found dog object.
    // React.useEffect(() => {
    //     if (params.id)
    //         setDog(dogs.find((dog) => dog.getId() === parseInt(params.id!)));
    // }, []);

    //renders a grid layout with two columns. In the first column, it displays the dog's image, and in the second column,
    //it displays information about the dog such as owner and age

    const [dog, setDog] = useState<Dog | undefined>(undefined);
    const {selectedDogId} = useDogStore();

    useEffect(() => {
        fetchDogDetails();
    }, [selectedDogId]);
    const fetchDogDetails = async () => {
        if (selectedDogId !== null) {
            try {
                const response = await axios.get(
                    `http://localhost:3001/api/dogs/${selectedDogId}`,
                );
                const dogData = response.data;
                const dog = new Dog(
                    dogData.id,
                    dogData.name,
                    dogData.breed,
                    dogData.description,
                    dogData.imageUrl,
                    dogData.age,
                    dogData.owner,
                );
                setDog(dog);
            } catch (error) {
                console.error('Error fetching dog details:', error);
            }
        }
    };
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <img
                        src={dog?.getImage()}
                        alt={dog?.getName()}
                        style={{width: '100%', height: 'auto'}}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                <b>Owner:</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                disabled={true}
                                value={dog?.getOwner() || ''}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                <b>Age:</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                disabled={true}
                                value={dog?.getAge() || ''}
                            ></TextField>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
export default Detail;
