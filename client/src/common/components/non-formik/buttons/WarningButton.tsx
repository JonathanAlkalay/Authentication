import { BaseButton } from "./BaseButton"


const style = {

}

interface PrimaryButtonProps {
    label: string;
    onClick: () => void;
}
export const WarningButton = ({ label, onClick}: PrimaryButtonProps) => {
    return (
        <BaseButton label={label} onClick={onClick} style={style} variant='contained'/>
    )
}