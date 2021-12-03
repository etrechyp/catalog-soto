import { useState, useContext } from 'react';
import { Paper, Box, TextField, Stepper, Step, StepLabel } from '@mui/material';
import Image from 'next/image';
import styles from './styles';
import props from './props';
import PersonalInfoSection from './PersonalInfoSection';
import CompanyOcuppationSection from './CompanyOccupationSection';

import { LanguageContext } from '../../context/LanguageContext';

const CompanyLogo = () => {
  return (
    <Box sx={styles.companyLogo}>
      <Image {...props.logoImage} alt='company logo' />
    </Box>
  );
};

const SignUpForm = () => {
  const { languageSelected } = useContext(LanguageContext);
  const [globalFormData, setGlobalFormData] = useState({
    globalData: {
      firstName: 'Luis',
      lastName: 'Barboza',
      email: 'lbarbozanav@gmail.com',
      password: '123456',
      address: 'Venezuela, por alli',
      country: 'VE',
      state: 'V',
      city: 'Maracaibo',
      phone: '+584246030352',
      zipCode: '40056', 
      companyName: '',
      organizationType: '',
      businessStyle: '',
      yearStablished: '',
    },
    steps: ['PERSONAL_INFO', 'COMPANY_OCCUPATION'],
    currentStep: 0,
  });

  return (
    <Box sx={styles.wrapper}>
      <Paper sx={styles.signUpFormBox}>
        <CompanyLogo />
        <Stepper activeStep={globalFormData.currentStep} alternativeLabel>
          {globalFormData.steps.map((label) => (
            <Step key={label}>
              <StepLabel>{languageSelected[label]}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {globalFormData.currentStep === 0 ? (
          <PersonalInfoSection
            globalFormData={globalFormData.globalData}
            setGlobalFormData={setGlobalFormData}
            languageSelected={languageSelected}
          />
        ) : (
          <CompanyOcuppationSection
            globalFormData={globalFormData.globalData}
            setGlobalFormData={setGlobalFormData}
            languageSelected={languageSelected}
          />
        )}
      </Paper>
    </Box>
  );
};

export default SignUpForm;
