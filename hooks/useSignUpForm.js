import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useForm from './useForm';
import IconButton from '@mui/material/IconButton';
import { AiOutlineClose } from 'react-icons/ai';

const useSignUpForm = (MSECONDS_TILL_REDIRECT) => {
  const [{ fullName, emailField, password }, handleChange] = useForm({
    fullName: '',
    emailField: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const [openToast, setOpenToast] = useState(false);
  const [activeTimerID, setActiveTimerID] = useState(null);
  const [toastToShow, setToastToShow] = useState(null);
  const router = useRouter();

  //elimina el evento que redirige hacia la pagina en "/" al cambiar de pagina
  useEffect(() => {
    return () => {
      clearTimeout(activeTimerID);
    };
  }, [activeTimerID]);

  //Gestiona el evento de registro
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      name: fullName,
      email: emailField,
      password,
      role: 'USER_ROLE',
    };
    const response = await fetch('http://localhost:8082/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    if (responseData.ok) {
      setOpenToast(true);
      setToastToShow("REGISTERED_USER");

      const timerID = setTimeout(() => {
        router.push('/');
      }, MSECONDS_TILL_REDIRECT);

      setActiveTimerID(timerID);
    } else if(!responseData.ok && responseData.errors.errors.length) {
      alert("OVER HERE")
      setOpenToast(true);
      setToastToShow("ERROR");
      setErrors(responseData.errors.errors);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastToShow(null);
    setOpenToast(false);
  };

  const action = (
    <>
      <IconButton
        size='small'
        aria-label='close'
        color='inherit'
        onClick={handleClose}
      >
        <AiOutlineClose />
      </IconButton>
    </>
  );

  return {
    fullName,
    emailField,
    password,
    handleChange,
    handleSubmit,
    openToast,
    handleClose,
    action,
    errors,
    toastToShow
  };
};

export default useSignUpForm;
