import TextField from '@mui/material/TextField';


const styles = {

}

interface InputTextProps {
    text: string;
    label: string;
}
export const InputText = ({ label }: InputTextProps) => {
    return (
        <TextField label={label} variant="outlined" />
    )
}