import { BaseButton } from "./BaseButton"


const style = {

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