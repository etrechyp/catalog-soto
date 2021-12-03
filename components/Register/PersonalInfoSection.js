import { Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { MdNavigateNext } from 'react-icons/md';
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input';
import { Country, State, City } from 'country-state-city';
import MyTextField from '../shared/MyTextfield';
import MySelect from '../shared/MySelect';
import { personalInfoFormvalidationSchema as validationSchema } from './validations';
import styles from './styles';
import { useEffect } from 'react';

const countries = Country.getAllCountries();

const PersonalInfoSection = ({
  globalFormData,
  setGlobalFormData,
  languageSelected,
}) => {
  useEffect(() => {}, [globalFormData]);
  return (
    <Formik
      initialValues={{
        firstName: globalFormData.firstName,
        lastName: globalFormData.lastName,
        email: globalFormData.email,
        password: globalFormData.password,
        address: globalFormData.address,
        country: globalFormData.country,
        state: globalFormData.state,
        city: globalFormData.city,
        phone: globalFormData.phone,
        zipCode: globalFormData.zipCode,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setGlobalFormData((prevData) => ({
          ...prevData,
          globalData: values,
          currentStep: 1,
        }));
      }}
    >
      {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
        <Form style={styles.formWrapper}>
          <Box sx={styles.formFlexbox}>
            <MyTextField
              placeholder={languageSelected['FIRST_NAME']}
              name='firstName'
              sx={styles.formInputStyles}
            />
            <MyTextField
              placeholder={languageSelected['LAST_NAME']}
              name='lastName'
              sx={styles.formInputStyles}
            />
            <MyTextField
              placeholder={languageSelected['EMAIL']}
              name='email'
              type='email'
              sx={styles.formInputStyles}
            />
            <MyTextField
              placeholder={languageSelected['PASSWORD']}
              name='password'
              type='password'
              sx={styles.formInputStyles}
            />
            <MyTextField
              placeholder={languageSelected['ADDRESS']}
              name='address'
              sx={styles.formInputStyles}
            />
            <MySelect
              name='country'
              label={languageSelected['COUNTRY']}
              items={countries}
              targetKey='isoCode'
              sx={styles.formInputStyles}
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
                    sx={styles.formInputStyles}
                  />
                );
              })()}
            {!!values.state &&
              (() => {
                const cities = City.getCitiesOfState(
                  values.country,
                  values.state
                );
                return (
                  <MySelect
                    name='city'
                    label={languageSelected['CITY']}
                    items={cities}
                    targetKey='name'
                    sx={styles.formInputStyles}
                  />
                );
              })()}
            {!!values.country && (
              <>
                <Box sx={styles.formInputStyles}>
                  <PhoneInput
                    placeholder={languageSelected['PHONE_NUMBER']}
                    value={formatPhoneNumberIntl(values.phone)}
                    defaultCountry={values.country}
                    onChange={(phoneString) => {
                      if (!touched.phone) setFieldTouched('phone', true);

                      if (phoneString !== '') {
                        setFieldValue('phone', phoneString);
                      }
                    }}
                  />
                  <div className='mui-form-helper-text mui-form-helper-text-error'>
                    {/*Classes globales de /styles/globals.css*/}
                    {errors.phone && touched.phone && <div>{errors.phone}</div>}
                  </div>
                </Box>
              </>
            )}
            <MyTextField
              placeholder={languageSelected['ZIP_CODE']}
              name='zipCode'
              sx={styles.formInputStyles}
            />
            <Box sx={styles.formInputStyles}>
              <Button
                type='submit'
                variant='outlined'
                endIcon={<MdNavigateNext />}
                sx={{ width: '100%' }}
              >
                {languageSelected['NEXT']}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PersonalInfoSection;
