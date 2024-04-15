/* eslint-disable @typescript-eslint/no-explicit-any */
import {FormControl, InputLabel, Select} from '@mui/material';
import {Controller} from 'react-hook-form';

interface ReactHookFormSelectProps {
    name: string;
    label: string;
    control: any;
    defaultValue: string;
    children: React.ReactNode; //a way to pass elements, components, or text as children to a parent component
}

const ReactHookFormSelect = ({
    name,
    label,
    control,
    defaultValue,
    children,
    ...props
}: ReactHookFormSelectProps) => {
    const labelId = `${name}-label`;
    return (
        <FormControl fullWidth {...props}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Controller //It connects form inputs to the form statemanaged by react-hook-form, handling the registration of the input, its value, and any validation rules.
                render={(
                    {field}, //??????
                ) => (
                    <Select
                        fullWidth
                        labelId={labelId}
                        label={label}
                        {...field}
                    >
                        {children}
                    </Select>
                )}
                name={name}
                control={control}
                defaultValue={defaultValue}
            />
        </FormControl>
    );
};
export default ReactHookFormSelect;
