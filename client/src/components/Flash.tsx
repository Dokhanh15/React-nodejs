import { Alert, Snackbar } from "@mui/material";

type FlashProps = {
  isShow: boolean;
};

function Flash({ isShow }: FlashProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isShow}
      onClose={() => {}}
      autoHideDuration={1000}
    >
      <Alert severity="success">This is a success Alert.</Alert>
    </Snackbar>
  );
}

export default Flash;
