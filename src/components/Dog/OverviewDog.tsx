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
import {Dog} from '../../model/Dog';
import {useDogStore} from '../../store/DogStore';

//declare functional component
const Overview = () => {
    const {dogs, setDogs, deleteDog, handlePossessions, handleOpen} =
        useDogStore(); //we extract specific values from the object returned by the custom hook
    const navigate = useNavigate();
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
    useEffect(() => {
        checkInternetStatus();
        const interval = setInterval(checkInternetStatus, 5000); // Check every 5 seconds
        return () => clearInterval(interval);
    });
    console.log(isOnline);

    const handleDelete = (dog: Dog) => {
        deleteDog(dog);
    };
    const handleSeePossessions = (dog: Dog) => {
        handlePossessions(dog);
        navigate(`/possessions`);
    };

    const [sortAscOrder, setSortAscOrder] = useState(false); // Initial sort order
    useEffect(() => {
        // creates a sorted copy of the dogs array, leaving the original dogs array unaffected.
        const sorted = [...dogs].sort((a, b) => {
            if (sortAscOrder) {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
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
                    <Grid key={dog.id} item xs={12} md={3}>
                        <Card sx={{maxWidth: 345}}>
                            <CardActionArea
                                onClick={() => navigate(`/dogs/${dog.id}`)}
                            >
                                <CardMedia
                                    sx={{height: 140}}
                                    image={dog.imageUrl}
                                    title={dog.name}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant='h5'
                                        component='div'
                                    >
                                        {`${dog.name}-${dog.breed}`}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        {dog.description}
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
                                    onClick={() => handleOpen(dog)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size='small'
                                    onClick={() => handleSeePossessions(dog)}
                                >
                                    Possessions
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
