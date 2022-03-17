import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SnackBar from "react-native-snackbar-component";

import {
  selectSnackbarOpen,
  selectSnackbarSeverity,
  selectSnackbarMessage,
} from "../../redux/loading/loading.selector";
import { useAppDispatch } from "../../hooks";
import useTimeout from "../../hooks/useTimeout";
import { closeSnackbar } from "../../redux/loading/loading.slice";

const CustomSnackbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const open = useSelector(selectSnackbarOpen);
  const severity = useSelector(selectSnackbarSeverity);
  const message = useSelector(selectSnackbarMessage);

  const [color, setColor] = useState("#22c55e");

  useEffect(() => {
    setColor(severity === "success" ? "#22c55e" : "red");
  }, [severity]);
  
  useTimeout(() => dispatch(closeSnackbar()), 3000);

  return (
    <SnackBar
      position="top"
      top={50}
      autoHidingTime={3000}
      visible={open}
      backgroundColor={color}
      textMessage={message}
    />
  );
};

export default CustomSnackbar;
