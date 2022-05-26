import { Backdrop, Snackbar } from "@mui/material";
import { useNotify } from "contexts";

function Notify() {
  const {
    notify,
    notification: { open, message },
  } = useNotify();

  return (
    <Backdrop
      open={open}
      onClick={notify}
      sx={{
        zIndex: (theme) => theme.zIndex.appBar + 1,
      }}
    >
      <Snackbar
        open={open}
        message={message}
        autoHideDuration={3500}
        onClose={notify}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      />
    </Backdrop>
  );
}

export default Notify;
