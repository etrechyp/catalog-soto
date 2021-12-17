import { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import useSnackbar from '../hooks/useSnackbar';

const useSignUpForm = () => {
  const { languageSelected } = useContext(LanguageContext);
  const { snackbar, setSnackbar, handleOpenCloseSnackbar } = useSnackbar();
  const [globalFormData, setGlobalFormData] = useState({
    globalData: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      country: '',
      state: '',
      city: '',
      phone: '',
      zipCode: '',
      companyName: '',
      organizationType: '',
      businessStyle: '',
      yearStablished: "",
    },
    steps: ['PERSONAL_INFO', 'COMPANY_OCCUPATION'],
    currentStep: 0,
  });

  //Todo Cambiar tipos de organizacion
  const organizationTypes = [
    languageSelected['PRIVATE_CORPORATION'],
    languageSelected['PUBLIC_CORPORATION'],
    'LLC'
  ];

  //Todo Revisar tipos de negocio
  const businessStyles = [
    'Wholesaler',
    'Store',
  ];

  const returnToFirstSection = (
    companyName,
    organizationType,
    businessStyle,
    yearStablished
  ) =>
    setGlobalFormData((prevData) => ({
      ...prevData,
      globalData: {
        ...prevData.globalData,
        companyName,
        organizationType,
        businessStyle,
        yearStablished,
      },
      currentStep: 0,
    }));

  return {
    languageSelected,
    globalFormData,
    setGlobalFormData,
    organizationTypes,
    businessStyles,
    returnToFirstSection,
    snackbar,
    setSnackbar,
    handleOpenCloseSnackbar,
  };
};

export default useSignUpForm;
