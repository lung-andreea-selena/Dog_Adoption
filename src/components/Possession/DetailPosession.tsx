import {Grid, TextField, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Possession} from '../../model/Possession';
import {usePossessionStore} from '../../store/PossessionStore';

const Detail = () => {
    const params = useParams();
    const [possession, setpossession] = useState<Possession | undefined>(
        undefined,
    );
    const {possessions} = usePossessionStore();
    useEffect(() => {
        if (params.id)
            setpossession(
                possessions.find(
                    (possession) => possession.Pid === parseInt(params.id!),
                ),
            );
    }, [params.id]);
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <img
                        src={possession?.imageUrl}
                        alt={possession?.title}
                        style={{width: '100%', height: 'auto'}}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                <b>Instructions:</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                disabled={true}
                                value={possession?.instructions || ''}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='body1'>
                                <b>Dog Id:</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                disabled={true}
                                value={possession?.dogId || ''}
                            ></TextField>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
export default Detail;
