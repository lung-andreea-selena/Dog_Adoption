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
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useDogStore from '../store/DogStore';

//declare functional component
const Overview = () => {
    const navigate = useNavigate(); //useNavigate hook is used to programmatically navigate to different pages within a React application
    const {dogs, setDogs, deleteDog, handleOpen} = useDogStore(); //we extract specific values from the object returned by the custom hook
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
                                    onClick={() => deleteDog(dog.getId())}
                                >
                                    Delete
                                </Button>
                                <Button
                                    size='small'
                                    onClick={() => handleOpen(dog)}
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
