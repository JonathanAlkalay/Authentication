import Button from '@mui/material/Button';

interface BaseButtonProps {
    label: string;
    style: {};
    onClick: () => void;
    variant: "text" | "outlined" | "contained";
    disabled?: boolean;
}
export const BaseButton = ({label, style, onClick, variant, disabled}: BaseButtonProps) => {
    return (
        <Button disabled={disabled ?? false} variant={variant} sx={style} onClick={onClick}> { label } </Button>
    )
}