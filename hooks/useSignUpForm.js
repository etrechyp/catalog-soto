import { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import useSnackbar from '../hooks/useSnackbar';

const useSignUpForm = () => {
  const { languageSelected } = useContext(LanguageContext);
  const { snackbar, setSnackbar, handleOpenCloseSnackbar } = useSnackbar();
  const [globalFormData, setGlobalFormData] = useState({
    globalData: {
      firstName: 'Luis',
      lastName: 'Barboza',
      email: 'lbarbozanav@gmail.com',
      password: '123456',
      address: 'Por ahi',
      country: 'VE',
      state: 'V',
      city: 'Maracaibo',
      phone: '+584246030352',
      zipCode: '40005',
      companyName: 'Sambil',
      organizationType: 'Private corporation',
      businessStyle: 'Distributor',
      yearStablished: 2012,
    },
    steps: ['PERSONAL_INFO', 'COMPANY_OCCUPATION'],
    currentStep: 1,
  });
  const organizationTypes = [
    languageSelected['PRIVATE_CORPORATION'],
    languageSelected['PUBLIC_CORPORATION'],
  ];

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
