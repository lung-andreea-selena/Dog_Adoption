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
import {useNavigate} from 'react-router-dom';
import {User} from '../../model/User';
import {useUserStore} from '../../store/UserStore';

//declare functional component
const Overview = () => {
    const {users, deleteUser, handleOpenUser} = useUserStore(); //we extract specific values from the object returned by the custom hook
    const navigate = useNavigate();

    const handleDelete = (user: User) => {
        deleteUser(user.Uid);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} display={'flex'}>
                <Grid item xs={6}>
                    <Typography variant='h4'>
                        Possessions of the dogs!
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <IconButton
                        onClick={() => handleOpenUser()}
                        aria-label='add'
                    >
                        <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                </Grid>
            </Grid>
            {users.map(
                (
                    user, //iterating through dogs array and setting each grid key to its id
                ) => (
                    <Grid key={user.Uid} item xs={12} md={3}>
                        <Card sx={{maxWidth: 345}}>
                            <CardActionArea
                                onClick={() => navigate(`/users/${user.Uid}`)}
                            >
                                <CardMedia
                                    sx={{height: 140}}
                                    title={user.name}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant='h5'
                                        component='div'
                                    >
                                        {`${user.email}-${user.type}`}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                    >
                                        {user.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button
                                    size='small'
                                    onClick={() => handleDelete(user)}
                                >
                                    Delete
                                </Button>
                                <Button
                                    size='small'
                                    onClick={() => handleOpenUser(user)}
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
