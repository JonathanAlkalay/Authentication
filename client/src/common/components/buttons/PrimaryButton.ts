import { styled } from '@mui/system';

export const PrimaryButton = styled('div')(({ theme }) => ({
    cursor: "pointer",
    height: "35px",
    width: "90px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    textAlign: "center",
    lineHeight: "35px", // giving line height of the same height as the button makes the text vertically centerd
    borderRadius: "3px",
    textShadow: `1px 1px ${theme.palette.common.black}`
  }));