import { SxProps } from '@mui/material';
import Button from '@mui/material/Button';

const styles: SxProps = {
    height: '45px',
    width: '120px'
}
interface BaseButtonProps {
    label: string;
    style: SxProps;
    onClick: () => void;
    variant: "text" | "outlined" | "contained";
    disabled?: boolean;
}
export const BaseButton = ({label, style, onClick, variant, disabled}: BaseButtonProps) => {
    return (
        <Button disabled={disabled ?? false} variant={variant} sx={{...styles ,...style}} onClick={onClick}> { label } </Button>
    )
}