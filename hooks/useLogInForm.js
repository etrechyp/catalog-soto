import useForm from './useForm';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import useSnackbar from './useSnackbar';
import { LanguageContext } from '../context/LanguageContext';
import getSellercloudTokenData from '../helper';

const useLogInForm = () => {
  const [{ emailField, password }, handleChange] = useForm({
    emailField: 'test@mail.com',
    password: '123456',
  });
  const { dispatchAuth } = useContext(AuthContext);
  const { snackbar, setSnackbar, handleOpenCloseSnackbar } = useSnackbar();
  const { languageSelected } = useContext(LanguageContext);
  const router = useRouter();

  const handleLogin = async () => {
    const requestBody = {
      email: emailField,
      password,
    };

    if (emailField === '' || password === '') {
      setSnackbar({
        open: true,
        severity: 'error',
        message: languageSelected['EMPTY_FIELDS'],
      });

      return;
    }

    const response = await fetch(`http://192.168.88.2:8082/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    if (responseData.msg === 'login OK') {
      const sellercloudTokenData = await getSellercloudTokenData(
        responseData.token
      );

      dispatchAuth({
        type: 'LOGIN',
        user: responseData.user,
        token: responseData.token,
      });
      dispatchAuth({
        type: 'SELLERCLOUD_REQUEST_TOKEN',
        tokenData: sellercloudTokenData,
      });
      router.push('/catalog');
    }
  };

  return {
    emailField,
    password,
    handleChange,
    handleLogin,
    snackbar,
    setSnackbar,
    handleOpenCloseSnackbar,
    languageSelected,
  };
};

export default useLogInForm;
