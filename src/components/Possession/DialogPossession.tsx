//dialog for adding or editing information about a dog
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button, Grid, MenuItem, TextField, Typography} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {PossessionType} from '../../model/Possession';
import {usePossessionStore} from '../../store/PossessionStore';
import ReactHookFormSelect from './ReactHookFormSelect';
interface Inputs {
    dogId: number;
    title: string;
    type: PossessionType;
    description: string;
    imageUrl: string;
    instructions: string;
}
const PossessionDialog = () => {
    const {
        opened,
        handleClose,
        addPossession,
        selectedPossession,
        editPossession,
    } = usePossessionStore();
    const {register, handleSubmit, control, reset} = useForm<Inputs>({}); // hook is used to initialize form state and handle form submission

    useEffect(() => {
        reset(selectedPossession);
    }, [selectedPossession]);

    //Depending on whether a dog is selected or not, it either adds a new dog or edits an existing one
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (selectedPossession) {
            const updatedPosessions = {
                id: selectedPossession.id,
                title: data.title,
                type: data.type as PossessionType,
                description: data.description,
                imageUrl: data.imageUrl,
                instructions: data.instructions,
            };
            reset();
            handleClose();
            editPossession(updatedPosessions);
        } else {
            addPossession({
                id: Math.floor(Math.random() * 1000),
                title: data.title,
                type: data.type as PossessionType,
                description: data.description,
                imageUrl: data.imageUrl,
                instructions: data.instructions,
            });
            reset();
            handleClose();
        }
    };

    return (
        <Dialog
            open={opened}
            onClose={handleClose}
            fullWidth
            maxWidth='sm'
            fullScreen={false}
        >
            <form style={{padding: 16}} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h5'>
                            Add a new possession
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Title'
                            fullWidth
                            {...register('title', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Description'
                            fullWidth
                            {...register('description', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Image URL'
                            fullWidth
                            {...register('imageUrl', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Instructions'
                            fullWidth
                            {...register('instructions', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ReactHookFormSelect
                            label='Type'
                            control={control}
                            defaultValue={''}
                            name={'type'}
                        >
                            {Object.keys(PossessionType).map((type) => {
                                const value =
                                    PossessionType[
                                        type as keyof typeof PossessionType
                                    ];
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
                        <Button variant='outlined' onClick={handleClose}>
                            Close
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Dialog>
    );
};

export default PossessionDialog;
