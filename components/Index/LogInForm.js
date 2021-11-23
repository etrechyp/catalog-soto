import { Box, Button, Paper, TextField } from '@mui/material';
import { MdArrowForwardIos } from 'react-icons/md';
import { BsPersonPlus } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles';
import props from './props';
import useLogInForm from '../../hooks/useLogInForm';

export default function LogInForm() {
  const { emailField, password, handleChange, handleLogin } = useLogInForm();

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.flexContainer}>
        <Box>
          <Image {...props.logoImage} alt='Company logo' />
        </Box>
        <Box sx={styles.logInForm}>
          <TextField
            {...props.emailField(emailField, handleChange, styles.textfield)}
          />
          <TextField
            {...props.passwordField(password, handleChange, styles.textfield)}
          />

          <Box sx={styles.buttonsWrapper}>
            <Button
              {...props.logInButton(
                MdArrowForwardIos,
                styles.logInButton,
                handleLogin
              )}
            >
              Log In
            </Button>
            <Link href='/register' passHref>
              <Button variant='outlined' startIcon={<BsPersonPlus />}>
                Register
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
