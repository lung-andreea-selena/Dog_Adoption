import React, {useEffect, useState} from 'react';
import axios from 'axios';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import {useNavigate} from 'react-router-dom';
import {Container, Typography} from '@mui/material';
import {User} from '../../model/User';

const UserInfo: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const authHeader = useAuthHeader();
    const signOut = useSignOut();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log(authHeader);
                if (authHeader) {
                    const response = await axios.get(
                        'http://localhost:3001/api/info',
                        {
                            headers: {
                                Authorization: authHeader,
                            },
                        },
                    );
                    setUser(response.data);
                    console.log('response:', response);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                signOut();
                navigate('/login');
            }
        };

        fetchUserData();
    }, [authHeader, navigate, signOut]);

    return (
        <Container>
            {user ? (
                <>
                    <Typography variant='h4'>User Info</Typography>
                    <Typography variant='body1'>Name: {user.name}</Typography>
                    <Typography variant='body1'>Age: {user.age}</Typography>
                    <Typography variant='body1'>Email: {user.email}</Typography>
                    <Typography variant='body1'>
                        Password: {user.password}
                    </Typography>
                    <Typography variant='body1'>type: {user.type}</Typography>
                </>
            ) : (
                <Typography variant='h6'>
                    Loading user information...
                </Typography>
            )}
        </Container>
    );
};

export default UserInfo;
