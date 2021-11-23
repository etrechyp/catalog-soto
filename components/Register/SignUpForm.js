import { Box, Button, TextField, Snackbar, Alert } from '@mui/material';
import Image from 'next/image';
import Link from 'next/Link';
import styles from './styles';
import props from './props';
import useSignUpForm from '../../hooks/useSignUpForm';

export default function SignUpForm() {
  const MSECONDS_TILL_REDIRECT = 3000;
  const {
    fullName,
    emailField,
    password,
    handleSubmit,
    handleChange,
    openToast,
    handleClose,
    action,
    errors,
    toastToShow
  } = useSignUpForm(MSECONDS_TILL_REDIRECT);

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.flexContainer}>
        <Box>
          <Image {...props.logoImage} alt='company logo' />
        </Box>
        <Box sx={styles.logInForm}>
          <TextField
            {...props.fullName(fullName, handleChange, styles.textfield)}
          />
          <TextField
            {...props.emailField(emailField, handleChange, styles.textfield)}
          />
          <TextField
            {...props.passwordField(password, handleChange, styles.textfield)}
          />
          <Box sx={{ ...styles.buttonsWrapper, justifyContent: 'center' }}>
            <Button variant='outlined' onClick={handleSubmit}>
              Register
            </Button>
          </Box>
        </Box>
      </Box>
      {toastToShow && toastToShow === "REGISTERED_USER" ? <Snackbar
        {...props.snackbarToast(openToast, MSECONDS_TILL_REDIRECT, handleClose, action)}
      /> : toastToShow && toastToShow === "ERROR" && errors.map((error, index) => (
        <Snackbar key={index}
          {...props.snackbarToast(openToast, MSECONDS_TILL_REDIRECT, handleClose)}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {error.msg}
          </Alert>
        </Snackbar>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link href='/'>
          <a style={{ color: 'blue' }}>Ya tienes cuenta? Inicia sesión</a>
        </Link>
      </Box>
    </Box>
  );
}
