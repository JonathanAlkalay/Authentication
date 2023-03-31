import TextField from '@mui/material/TextField';
import { useField } from 'formik'
import { ComponentStyle } from '../../Theme';

const styles = {
    mainContainer: {
        '& .MuiTextField-root': {
            width: '100%'
        }
    } as ComponentStyle
}

interface InputTextProps {
    label: string;
    name: string
}
export const InputText = ({ label, name }: InputTextProps) => {

    const [ field, _ , helpers ] = useField<string>(name);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        helpers.setValue(event.target.value);
    }

    return (
        <TextField sx={styles.mainContainer} onChange={onChange} value={field.value} label={label} variant="outlined" />
    )
}