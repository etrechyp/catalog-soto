import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function CustomizedSnackbars({   
  openSnackbar,
  handleCloseSnackbar,
  snackbarDuration,
  severity,
  snackbarMessage,
}) {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={snackbarDuration}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
