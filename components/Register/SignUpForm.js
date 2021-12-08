import { Paper, Box, Stepper, Step, StepLabel } from '@mui/material';
import Image from 'next/image';
import styles from './styles';
import props from './props';
import PersonalInfoSection from './PersonalInfoSection';
import CompanyOcuppationSection from './CompanyOccupationSection';
import useSignUpForm from '../../hooks/useSignUpForm';
import Link from 'next/link';

const CompanyLogo = () => {
  return (
    <Box sx={styles.companyLogo}>
      <Image {...props.logoImage} alt='company logo' />
    </Box>
  );
};

const SignUpForm = () => {
  const {
    languageSelected,
    globalFormData,
    setGlobalFormData,
    organizationTypes,
    businessStyles,
    returnToFirstSection,
    snackbar,
    setSnackbar,
    handleOpenCloseSnackbar,
  } = useSignUpForm();

  return (
    <Box sx={styles.wrapper}>
      <Paper sx={styles.signUpFormBox}>
        <CompanyLogo />
        <Link href='/'>
          <a style={{ color: 'blue' }}>
            {languageSelected['HAVE_YOU_REGISTERED_ALREADY']}
          </a>
        </Link>
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
            organizationTypes={organizationTypes}
            businessStyles={businessStyles}
            returnToFirstSection={returnToFirstSection}
            snackbar={snackbar}
            setSnackbar={setSnackbar}
            handleOpenCloseSnackbar={handleOpenCloseSnackbar}
          />
        )}
      </Paper>
    </Box>
  );
};

export default SignUpForm;
