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
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Possession} from '../../model/Possession';
import {usePossessionStore} from '../../store/PossessionStore';

//declare functional component
const Overview = () => {
    const {possessions, setPosessions, deletePossesion, handleOpen} =
        usePossessionStore(); //we extract specific values from the object returned by the custom hook
    const navigate = useNavigate();
    // const [isOnline, setIsOnline] = useState<boolean>(true);

    // const checkInternetStatus = async () => {
    //     try {
    //         const response = await axios.get(
    //             'http://localhost:3001/api/check-internet',
    //         );
    //         setIsOnline(response.data.isOnline);
    //         if (!response.data.isOnline) {
    //             // Alert the user that the internet connection is down
    //             alert('Internet connection is down!');
    //         }
    //     } catch (error) {
    //         setIsOnline(false); // If there's an error, assume offline
    //         alert('Internet connection is down!');
    //     }
    // };
    // useEffect(() => {
    //     checkInternetStatus();
    //     const interval = setInterval(checkInternetStatus, 5000); // Check every 5 seconds
    //     return () => clearInterval(interval);
    // });
    // console.log(isOnline);

    const handleDelete = (possession: Possession) => {
        deletePossesion(possession);
    };

    const [sortAscOrder, setSortAscOrder] = useState(false); // Initial sort order
    useEffect(() => {
        // creates a sorted copy of the dogs array, leaving the original dogs array unaffected.
        const sorted = [...possessions].sort((a, b) => {
            if (sortAscOrder) {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });
        console.log(sorted);
        setPosessions(sorted);
    }, [sortAscOrder]);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} display={'flex'}>
                <Grid item xs={6}>
                    <Typography variant='h4'>
                        Possessions of the dogs!
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Button onClick={() => setSortAscOrder(!sortAscOrder)}>
                        {sortAscOrder ? 'descendent' : 'ascedent'}
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <IconButton onClick={() => handleOpen()} aria-label='add'>
                        <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                </Grid>
            </Grid>
            {possessions.map(
                (
                    possession, //iterating through dogs array and setting each grid key to its id
                ) => (
                    <Grid key={possession.Pid} item xs={12} md={3}>
                        <Card sx={{maxWidth: 345}}>
                            <CardActionArea
                                onClick={() =>
                                    navigate(`/possessions/${possession.Pid}`)
                                }
                            >
                                <CardMedia
                                    sx={{height: 140}}
                                    image={possession.imageUrl}
                                    title={possession.title}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant='h5'
                                        component='div'
                                    >
                                        {`${possession.title}-${possession.type}`}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        {possession.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    size='small'
                                    onClick={() => handleDelete(possession)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    size='small'
                                    onClick={() => handleOpen(possession)}
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
