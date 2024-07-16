import { Box, LinearProgress } from "@mui/material";
import { FC } from "react";

type LoadingProps = {
  isShow: boolean;
};

const Loading: FC<LoadingProps> = ({ isShow }) => {
  return (
    <>
      {isShow && (
        <Box sx={{ width: "100%" }} >
          <LinearProgress />
        </Box>
      )}
    </>
  );
};

export default Loading;
