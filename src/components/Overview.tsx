/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Dog} from '../model/Dog';
import {useDogStore} from '../store/DogStore';

//declare functional component
const Overview = () => {
    // const navigate = useNavigate(); //useNavigate hook is used to programmatically navigate to different pages within a React application
    // const {dogs, setDogs, deleteDog, handleOpen} = useDogStore(); //we extract specific values from the object returned by the custom hook

    const navigate = useNavigate();
    const {handleOpen} = useDogStore();
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [isOnline, setIsOnline] = useState<boolean>(true);
    const checkInternetStatus = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3001/api/check-internet',
            );
            setIsOnline(response.data.isOnline);
            if (!response.data.isOnline) {
                // Alert the user that the internet connection is down
                alert('Internet connection is down!');
            }
        } catch (error) {
            setIsOnline(false); // If there's an error, assume offline
            alert('Internet connection is down!');
        }
    };
    const fetchDogs = () => {
        axios
            .get('http://localhost:3001/api/dogs')
            .then((response) => {
                const dogs = response.data.map(
                    (dog: any) =>
                        new Dog(
                            dog.id,
                            dog.name,
                            dog.breed,
                            dog.description,
                            dog.imageUrl,
                            dog.age,
                            dog.owner,
                        ),
                );
                setDogs(dogs);
            })
            .catch((error) => {
                console.error('Error fetching dogs:', error);
            });
    };
    useEffect(() => {
        checkInternetStatus();
        const interval = setInterval(checkInternetStatus, 5000); // Check every 5 seconds
        return () => clearInterval(interval);
    });
    console.log(isOnline);
    useEffect(() => {
        fetchDogs();
    }, []);
    const handleDelete = async (dog: Dog) => {
        try {
            await axios.delete(`http://localhost:3001/api/dogs/${dog.getId()}`);
            fetchDogs();
        } catch (error) {
            console.error('Error deleting dog:', error);
        }
    };
    const [sortAscOrder, setSortAscOrder] = useState(false); // Initial sort order
    useEffect(() => {
        // creates a sorted copy of the dogs array, leaving the original dogs array unaffected.
        const sorted = [...dogs].sort((a, b) => {
            if (sortAscOrder) {
                return a.getName().localeCompare(b.getName());
            } else {
                return b.getName().localeCompare(a.getName());
            }
        });
        console.log(sorted);
        setDogs(sorted);
    }, [sortAscOrder]);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} display={'flex'}>
                <Grid item xs={6}>
                    <Typography variant='h4'>Dog for adoption!</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={() => setSortAscOrder(!sortAscOrder)}>
                        {sortAscOrder ? 'descendent' : 'ascedent'}
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={() => navigate(`/dogs/stats`)}>
                        Stats
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <IconButton onClick={() => handleOpen()} aria-label='add'>
                        <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                </Grid>
            </Grid>
            {dogs.map(
                (
                    dog, //iterating through dogs array and setting each grid key to its id
                ) => (
                    <Grid key={dog.getId()} item xs={12} md={3}>
                        <Card sx={{maxWidth: 345}}>
                            <CardActionArea
                                onClick={() => navigate(`/dogs/${dog.getId()}`)}
                            >
                                <CardMedia
                                    sx={{height: 140}}
                                    image={dog.getImage()}
                                    title={dog.getName()}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant='h5'
                                        component='div'
                                    >
                                        {`${dog.getName()}-${dog.getBreed()}`}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        {dog.getDescription()}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    size='small'
                                    onClick={() => handleDelete(dog)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    size='small'
                                    onClick={() => handleOpen(dog.getId())}
                                >
                                    Edit
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ),
            )}
        </Grid>
    );
};
export default Overview;
