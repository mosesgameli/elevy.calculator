import { styled, Switch } from "@mui/material";

const MaterialSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    border: `1px solid black`,
    backgroundColor: "black",
    "&:before, &:after": {
      content: '""',
      top: "50%",
      width: 16,
      height: 16,
      position: "absolute",
      transform: "translateY(-50%)",
    },
  },
  "& .MuiSwitch-thumb": {
    margin: 2,
    width: 16,
    height: 16,
    boxShadow: "none",
    backgroundColor: theme.palette.mode === "dark" ? "white" : "black",
  },
}));

export default MaterialSwitch;
