import { styled } from "@mui/material";

const Image = styled("img")(({ theme, selected }) => ({
  width: 70,
  height: 70,
  marginRight: 15,
  transition: "all .3s ease-in-out",
  borderRadius: theme.shape.borderRadius,
  ...(selected && {
    borderWidth: 2,
    borderStyle: "solid",
    transform: "scale(1.15)",
    borderColor: theme.palette.primary.dark,
  }),
}));

export default Image;
