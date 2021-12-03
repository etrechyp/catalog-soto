import { useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { MdArrowForwardIos } from 'react-icons/md';
import { BsPersonPlus } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles';
import props from './props';
import useLogInForm from '../../hooks/useLogInForm';
import { LanguageContext } from '../../context/LanguageContext';

export default function LogInForm() {
  const { emailField, password, handleChange, handleLogin } = useLogInForm();
  const { languageSelected } = useContext(LanguageContext);

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
              {languageSelected['LOG_IN']}
            </Button>
            <Link href='/register' passHref>
              <Button variant='outlined' startIcon={<BsPersonPlus />}>
                {languageSelected['REGISTER']}
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
