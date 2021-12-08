import { useState } from 'react';

const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: null,
    message: '',
  });

  const handleOpenCloseSnackbar = (type) => {
    setSnackbar((prevState) => ({
      ...prevState,
      open: type === 'OPEN' ? true : false,
    }));
  };

  return {
    snackbar,
    setSnackbar,
    handleOpenCloseSnackbar,
  };
};

export default useSnackbar;
