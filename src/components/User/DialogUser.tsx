//dialog for adding or editing information about a dog
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button, Grid, MenuItem, TextField, Typography} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {UserType} from '../../model/User';
import ReactHookFormSelect from './ReactHookFormSelect';
import {useUserStore} from '../../store/UserStore';
interface Inputs {
    name: string;
    age: number;
    email: string;
    password: string;
    type: UserType;
}
const UserDialog = () => {
    const {userOpened, handleCloseUser, addUser, selectedUser, editUser} =
        useUserStore();
    const {register, handleSubmit, control, reset} = useForm<Inputs>({}); // hook is used to initialize form state and handle form submission

    useEffect(() => {
        reset(selectedUser);
    }, [selectedUser]);

    //Depending on whether a dog is selected or not, it either adds a new dog or edits an existing one
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (selectedUser) {
            const updatedUser = {
                Uid: selectedUser.Uid,
                name: data.name,
                age: data.age,
                email: data.email,
                password: data.password,
                type: data.type as UserType,
            };
            reset();
            handleCloseUser();
            editUser(updatedUser);
        } else {
            addUser({
                Uid: Math.floor(Math.random() * 1000),
                name: data.name,
                age: data.age,
                email: data.email,
                password: data.password,
                type: data.type as UserType,
            });
            reset();
            handleCloseUser();
        }
    };

    return (
        <Dialog
            open={userOpened}
            onClose={handleCloseUser}
            fullWidth
            maxWidth='sm'
            fullScreen={false}
        >
            <form style={{padding: 16}} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h5'>Add a new user</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Name'
                            fullWidth
                            {...register('name', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Age'
                            fullWidth
                            {...register('age', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Email'
                            fullWidth
                            {...register('email', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Password'
                            fullWidth
                            {...register('password', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ReactHookFormSelect
                            label='Type'
                            control={control}
                            defaultValue={''}
                            name={'type'}
                        >
                            {Object.keys(UserType).map((type) => {
                                const value =
                                    UserType[type as keyof typeof UserType];
                                return (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                );
                            })}
                        </ReactHookFormSelect>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        display={'flex'}
                        justifyContent={'flex-end'}
                    >
                        <Button variant='contained' type='submit' sx={{mr: 2}}>
                            Submit
                        </Button>
                        <Button variant='outlined' onClick={handleCloseUser}>
                            Close
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Dialog>
    );
};

export default UserDialog;
