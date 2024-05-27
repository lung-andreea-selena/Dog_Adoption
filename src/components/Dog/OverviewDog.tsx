/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {Dog} from '../../model/Dog';
import {useDogStore} from '../../store/DogStore';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import './OverviewDog.css';

//declare functional component
const Overview = () => {
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
    // const [sortAscOrder, setSortAscOrder] = useState(false); // Initial sort order
    // useEffect(() => {
    //     // creates a sorted copy of the dogs array, leaving the original dogs array unaffected.
    //     const sorted = [...dogs].sort((a, b) => {
    //         if (sortAscOrder) {
    //             return a.name.localeCompare(b.name);
    //         } else {
    //             return b.name.localeCompare(a.name);
    //         }
    //     });
    //     console.log(sorted);
    //     setDogs(sorted);
    // }, [sortAscOrder]);

    const {dogs, deleteDog, handleOpen} = useDogStore(); //we extract specific values from the object returned by the custom hook
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 4;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = dogs.slice(firstIndex, lastIndex);
    const npage = Math.ceil(dogs.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    // const storedUser = localStorage.getItem('selectedUser');
    // const selectedUser = storedUser ? JSON.parse(storedUser) : null;
    const [loggedInTime] = useState(Date.now()); // Capture login time

    const tokenLifetime = 60 * 60 * 1000; // Example token lifetime in milliseconds (1 hour)
    const bufferTime = 60 * 5000; // Buffer time before token expiration (5 minutes)
    const logoutThreshold = tokenLifetime - bufferTime; // Time after which to trigger logout

    useEffect(() => {
        const intervalId = setInterval(() => {
            const elapsedTime = Date.now() - loggedInTime;
            if (elapsedTime >= logoutThreshold) {
                signOut(); // Trigger logout
                //localStorage.removeItem('token');
                //localStorage.removeItem('selectedUser');
                navigate('/sign-in');
            }
        }, 5000); // Check every 5 seconds
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    const signOut = useSignOut();

    const handleDelete = (dog: Dog) => {
        deleteDog(dog);
    };
    const handleLogout = () => {
        signOut();
        //localStorage.removeItem('token');
        //localStorage.removeItem('selectedUser');
        navigate(`/login`);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} display={'flex'}>
                <Grid item xs={4}>
                    <Typography variant='h4'>Dog for adoption!</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={() => navigate(`/possessions`)}>
                        Possessions
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={() => navigate(`/user-info`)}>Info</Button>
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
            {records.map(
                (
                    dog, //iterating through dogs array and setting each grid key to its id
                ) => (
                    <Grid key={dog.Did} item xs={12} md={3}>
                        <Card sx={{maxWidth: 345}}>
                            <CardActionArea
                                onClick={() => navigate(`/dogs/${dog.Did}`)}
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
                            </CardActions>
                        </Card>
                    </Grid>
                ),
            )}
            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <a href='#' className='page-link' onClick={prePage}>
                            Prev
                        </a>
                    </li>
                    {numbers.map((n, i) => (
                        <li
                            className={`page-item ${currentPage === n ? 'active' : ''}`}
                            key={i}
                        >
                            <a
                                href='#'
                                className='page-item'
                                onClick={() => changeCPage(n)}
                            >
                                {n}
                            </a>
                        </li>
                    ))}
                    <li className='page-item'>
                        <a href='#' className='page-link' onClick={nextPage}>
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
            <Button
                variant='contained'
                size='medium'
                onClick={handleLogout}
                sx={{marginTop: 'auto'}}
            >
                Logout
            </Button>
        </Grid>
    );
    function prePage() {
        if (currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1);
        }
    }
    function changeCPage(id: number) {
        setCurrentPage(id);
    }
    function nextPage() {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1);
        }
    }
};
export default Overview;
