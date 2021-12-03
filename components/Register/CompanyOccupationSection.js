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

const CompanyOcuppationSection = ({
  globalFormData,
  setGlobalFormData,
  languageSelected,
}) => {
  const organizationTypes = [
    languageSelected['PRIVATE_CORPORATION'],
    languageSelected['PUBLIC_CORPORATION'],
  ];

  const businessStyles = [
    languageSelected['DISTRIBUTOR'],
    languageSelected['STORE'],
  ];

  const returnToFirstSection = () =>
    setGlobalFormData((prevGlobalData) => ({
      ...prevGlobalData,
      currentStep: 0,
    }));

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Formik
        initialValues={{
          companyName: globalFormData.companyName,
          organizationType: globalFormData.organizationType,
          businessStyle: globalFormData.businessStyle,
          yearStablished: globalFormData.yearStablished,
        }}
      >
        {({ values, setFieldValue }) => (
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
                  endIcon={<MdOutlineNavigateBefore />}
                  sx={{ width: '100%' }}
                  onClick={returnToFirstSection}
                >
                  {languageSelected['PREVIOUS']}
                </Button>
                <LoadingButton
                  variant='outlined'
                  endIcon={<MdOutlineNavigateNext />}
                  sx={{ width: '100%' }}
                  disabled
                >
                  {languageSelected['SUBMIT']}
                </LoadingButton>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  );
};

export default CompanyOcuppationSection;
