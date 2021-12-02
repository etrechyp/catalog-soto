import { useState, useContext } from 'react';
import { Formik, Field, Form, useField } from 'formik';
import {
  Paper,
  Box,
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
  Stepper,
  MenuItem,
  Step,
  StepLabel,
} from '@mui/material';
import Image from 'next/image';
import styles from './styles';
import props from './props';
import { LanguageContext } from '../../context/LanguageContext';
import { Country, State, City } from 'country-state-city';

const countries = Country.getAllCountries();

const SignUpForm = () => {
  const { languageSelected } = useContext(LanguageContext);
  const [globalFormData, setGlobalFormData] = useState({
    globalData: {},
    steps: [
      languageSelected['PERSONAL_INFO'],
      languageSelected['COMPANY_OCCUPATION'],
    ],
    currentStep: 0,
  });

  return (
    <Box sx={styles.wrapper}>
      <Paper
        sx={{
          width: {
            xs: '90vw',
            md: '900px',
          },
          height: '80vh',
          overflowY: 'auto',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Box sx={{ flexBasis: '200px' }}>
          <Image {...props.logoImage} alt='company logo' />
        </Box>
        <Stepper activeStep={globalFormData.currentStep} alternativeLabel>
          {globalFormData.steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {globalFormData.currentStep === 0 && (
          <PersonalDataForm
            globalFormData={globalFormData}
            setGlobalFormData={setGlobalFormData}
            languageSelected={languageSelected}
          />
        )}
      </Paper>
    </Box>
  );
};

const MyTextField = ({ placeholder, sx, type = 'text', ...props }) => {
  const [field, meta] = useField(props);
  const error = meta.error && meta.touched && meta.error;

  return (
    <TextField
      placeholder={placeholder}
      sx={sx}
      type={type}
      {...field}
      helperText={error}
      error={!!error}
    />
  );
};

const MySelect = ({ items, label, sx, targetKey, ...props }) => {
  const [field, meta] = useField(props);
  const error = meta.error && meta.touched && meta.error;

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FormControl sx={sx}>
          <InputLabel id={label}>{label}</InputLabel>
          <Select
            labelId={label}
            label={label}
            sx={{ width: '100%' }}
            {...field}
          >
            {items.map((item) => {
              return (
                <MenuItem key={item[targetKey]} value={item[targetKey]}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
          {!!error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
      </Box>
    </>
  );
};

const PersonalDataForm = ({
  globalFormData,
  setGlobalFormData,
  languageSelected,
}) => {
  const inputStyles = {
    width: {
      xs: '100%',
      sm: '80%',
      md: '60%',
    },
  };

  return (
    <Formik
      initialValues={{
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
      }}
    >
      {({values}) => (
        <Form style={{ width: '100%' }}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              gap: '1rem',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <MyTextField
              placeholder={languageSelected['FIRST_NAME']}
              name='firstName'
              sx={inputStyles}
            />
            <MyTextField
              placeholder={languageSelected['LAST_NAME']}
              name='lastName'
              sx={inputStyles}
            />
            <MyTextField
              placeholder={languageSelected['EMAIL']}
              name='email'
              type='email'
              sx={inputStyles}
            />
            <MyTextField
              placeholder={languageSelected['PASSWORD']}
              name='password'
              type='password'
              sx={inputStyles}
            />
            <MyTextField
              placeholder={languageSelected['ADDRESS']}
              name='address'
              sx={inputStyles}
            />
            <MyTextField
              placeholder={`${languageSelected['PHONE']} `}
              name='phone'
              sx={inputStyles}
            />
            <MySelect
              name='country'
              label={languageSelected['COUNTRY']}
              items={countries}
              targetKey='isoCode'
              sx={inputStyles}
            />
            {!!values.country &&
              (() => {
                const states = State.getStatesOfCountry(values.country);
                return (
                  <MySelect
                    name='state'
                    label={languageSelected['STATE']}
                    items={states}
                    targetKey='isoCode'
                    sx={inputStyles}
                  />
                );
              })()}
            {!!values.state &&
              (() => {
                const cities = City.getCitiesOfState(values.country, values.state);
                console.log(cities)
                return (
                  <MySelect
                    name='city'
                    label={languageSelected['CITY']}
                    items={cities}
                    targetKey='name'
                    sx={inputStyles}
                  />
                );
              })()}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

const CompanyDataForm = () => <Formik></Formik>;

export default SignUpForm;

// export default function SignUpForm() {
//   const MSECONDS_TILL_REDIRECT = 3000;
//   const {
//     fullName,
//     emailField,
//     password,
//     handleSubmit,
//     handleChange,
//     openToast,
//     handleClose,
//     action,
//     errors,
//     toastToShow
//   } = useSignUpForm(MSECONDS_TILL_REDIRECT);

//   return (
//     <Box sx={styles.wrapper}>
//       <Box sx={styles.flexContainer}>
//         <Box>
//           <Image {...props.logoImage} alt='company logo' />
//         </Box>
//         <Box sx={styles.logInForm}>
//           <TextField
//             {...props.fullName(fullName, handleChange, styles.textfield)}
//           />
//           <TextField
//             {...props.emailField(emailField, handleChange, styles.textfield)}
//           />
//           <TextField
//             {...props.passwordField(password, handleChange, styles.textfield)}
//           />
//           <Box sx={{ ...styles.buttonsWrapper, justifyContent: 'center' }}>
//             <Button variant='outlined' onClick={handleSubmit}>
//               Register
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//       {toastToShow && toastToShow === "REGISTERED_USER" ? <Snackbar
//         {...props.snackbarToast(openToast, MSECONDS_TILL_REDIRECT, handleClose, action)}
//       /> : toastToShow && toastToShow === "ERROR" && errors.map((error, index) => (
//         <Snackbar key={index}
//           {...props.snackbarToast(openToast, MSECONDS_TILL_REDIRECT, handleClose)}
//         >
//           <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
//             {error.msg}
//           </Alert>
//         </Snackbar>
//       ))}
//       <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//         <Link href='/'>
//           <a style={{ color: 'blue' }}>Ya tienes cuenta? Inicia sesión</a>
//         </Link>
//       </Box>
//     </Box>
//   );
// }
