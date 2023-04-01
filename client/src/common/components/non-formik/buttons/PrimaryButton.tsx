import { BaseButton } from "./BaseButton"
import { Theme } from "../../../Theme";

const style = {
    backgroundColor: Theme.palette.primary.main
}

interface PrimaryButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}
export const PrimaryButton = ({ label, onClick, disabled}: PrimaryButtonProps) => {
    return (
        <BaseButton disabled={disabled} label={label} onClick={onClick} style={style} variant='outlined'/>
    )
}