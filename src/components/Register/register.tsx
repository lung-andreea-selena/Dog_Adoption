/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
interface IUserData {
    email: string;
    password: string;
}
export default function SignUp() {
    let token = '';
    const singIn = useSignIn<IUserData>();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState<string>('');
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const response = await axios.post(
                'http://localhost:3001/api/register',
                {
                    name: data.get('name'),
                    age: data.get('age'),
                    email: data.get('email'),
                    password: data.get('password'),
                    type: data.get('type'),
                },
            );
            token = response.data.token;
            console.log(response.data);

            if (
                singIn({
                    auth: {
                        token: token,
                        type: 'Bearer', //Bearer tokens are a general class of token that grants access to the party in possession of the token.
                    },
                    userState: {
                        email: response.data.email,
                        password: response.data.password,
                    },
                })
            ) {
                //if the sign-up is successful
                navigate('/dogs');
                console.log('Signed up successfully');
            } else {
                console.log('Error signing up');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error:', error.response?.data?.message); // Log the error message from the response
                setErrorMsg(
                    error.response?.data?.message || 'An error occurred', // Set the error message state
                );
            } else {
                console.error('Error:', error); // Log generic errors
                setErrorMsg('An error occurred'); // Set a generic error message state
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
                        Sign Up
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
                                    id='name'
                                    label='Full Name'
                                    name='name'
                                    autoComplete='name'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='age'
                                    label='Age'
                                    name='age'
                                />
                            </Grid>
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
                                    autoComplete='new-password'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='type'
                                    label='Type: user or manager or admin'
                                    name='type'
                                    autoComplete='type'
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Link href='/login' variant='body2'>
                                    Already have an account? Sing in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
