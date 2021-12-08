import { Box, Button, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Formik, Form } from 'formik';
import MyTextField from '../shared/MyTextfield';
import MySelect from '../shared/MySelect';
import styles from './styles';
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import moment from 'moment';
import CustomizedSnackbars from '../shared/CustomSnackbars';
import { companyOccupationValidationSchema } from './validations';
import { useRouter } from 'next/router';

const CompanyOcuppationSection = ({
  globalFormData,
  setGlobalFormData,
  languageSelected,
  organizationTypes,
  businessStyles,
  returnToFirstSection,
  snackbar,
  setSnackbar,
  handleOpenCloseSnackbar,
}) => {
  const { companyName, organizationType, businessStyle, yearStablished } =
    globalFormData;
  const router = useRouter();

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Formik
        initialValues={{
          companyName: companyName,
          organizationType: organizationType,
          businessStyle: businessStyle,
          yearStablished: yearStablished,
        }}
        onSubmit={async (values) => {
          const requestBody = {
            ...globalFormData,
            ...values,
          };
          const response = await fetch('http://192.168.88.2:8082/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });

          const responseData = await response.json();

          if (responseData.ok) {
            setSnackbar({
              open: true,
              severity: 'success',
              message: languageSelected['USER_REGISTERED'],
            });

            setTimeout(() => {
              router.push('/');
            }, 8000);
          }
        }}
        validationSchema={companyOccupationValidationSchema}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form style={styles.formWrapper}>
            <Box sx={styles.formFlexbox}>
              <MyTextField
                placeholder={languageSelected['COMPANY_NAME']}
                name='companyName'
                sx={styles.formInputStyles}
              />
              <MySelect
                name='organizationType'
                label={languageSelected['ORGANIZATION_TYPE']}
                items={organizationTypes}
                sx={styles.formInputStyles}
              />
              <MySelect
                name='businessStyle'
                label={languageSelected['BUSINESS_STYLE']}
                items={businessStyles}
                sx={styles.formInputStyles}
              />
              <Box sx={styles.formInputStyles}>
                <DatePicker
                  label={languageSelected['YEAR_STABLISHED']}
                  views={['year']}
                  inputFormat='yyyy'
                  maxDate={moment()}
                  value-={values.yearStablished}
                  onChange={(momentObj) => {
                    const year = momentObj.year();
                    setFieldValue('yearStablished', year);
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                          value: values.yearStablished,
                        }}
                      />
                    );
                  }}
                />
              </Box>
              <Box
                sx={{
                  ...styles.formInputStyles,
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <Button
                  variant='outlined'
                  startIcon={<MdOutlineNavigateBefore />}
                  sx={{ width: '100%' }}
                  onClick={() => {
                    returnToFirstSection(
                      values.companyName,
                      values.organizationType,
                      values.businessStyle,
                      values.yearStablished
                    );
                  }}
                >
                  {languageSelected['PREVIOUS']}
                </Button>
                <LoadingButton
                  loading={isSubmitting}
                  variant='outlined'
                  endIcon={<MdOutlineNavigateNext />}
                  sx={{ width: '100%' }}
                  //disabled
                  type='submit'
                >
                  {languageSelected['SUBMIT']}
                </LoadingButton>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>

      <CustomizedSnackbars
        snackbarDuration={8000}
        openSnackbar={snackbar.open}
        handleCloseSnackbar={() => handleOpenCloseSnackbar('CLOSE')}
        severity={snackbar.severity}
        snackbarMessage={snackbar.message}
      />
    </LocalizationProvider>
  );
};

export default CompanyOcuppationSection;
