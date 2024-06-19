/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
//import {useUserStore} from '../../store/UserStore';

const defaultTheme = createTheme();
interface IUserData {
    email: string;
    password: string;
}
export default function SignIn() {
    const singIn = useSignIn<IUserData>();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState<string>('');
    //const {selectedUser} = useUserStore();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const response = await axios.put(
                'https://mpp-backend-dp15.onrender.com/api/login',
                {
                    email: data.get('email'),
                    password: data.get('password'),
                },
            );
            const token = response.data.token;
            console.log(token);
            localStorage.setItem('token', token); // Store token in localStorage
            if (
                singIn({
                    auth: {
                        token: token,
                        type: 'Bearer',
                    },
                    userState: {
                        email: response.data.email,
                        password: response.data.password,
                    },
                })
            ) {
                const user = {
                    Uid: response.data.user.uid,
                    age: response.data.user.age,
                    name: response.data.user.name,
                    password: response.data.user.password,
                    email: response.data.user.email,
                    type: response.data.user.type,
                };
                console.log(user);
                navigate('/dogs');
                console.log('Logged in');
                console.log(response.data);
            } else {
                console.log('Error');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error:', error.response?.data?.message);
                setErrorMsg(
                    error.response?.data?.message || 'An error occurred',
                );
            } else {
                console.error('Error:', error);
                setErrorMsg('An error occurred');
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign In
                    </Typography>
                    {errorMsg && (
                        <Typography variant='body2' color='error'>
                            {errorMsg}
                            <br />
                            <br />
                        </Typography>
                    )}
                    <Box
                        component='form'
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{mt: 3}}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='email'
                                    label='Email Address'
                                    name='email'
                                    autoComplete='email'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name='password'
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='current-password'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value='remember'
                                            color='primary'
                                        />
                                    }
                                    label='Remember me'
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Link href='/register' variant='body2'>
                                    Don't have account yet? Sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
