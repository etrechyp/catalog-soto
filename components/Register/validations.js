import * as yup from 'yup';
import { isPossiblePhoneNumber } from 'react-phone-number-input';

const personalInfoFormvalidationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(6, 'The string shoud contain at least 6 characters')
    .max(15, 'The string should contain a maximum of 15 characters')
    .required(),
  address: yup.string().required(),
  phone: yup
    .string()
    .test('possiblePhoneNumber', 'Invalid phone number', (value) =>
      value && value.length > 0 ? isPossiblePhoneNumber(value) : true
    )
    .required(),
  country: yup.string().required(),
  state: yup.string().required(),
  city: yup.string().required(),
  zipCode: yup
    .string()
    .matches(/(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/, {
      excludeEmptyString: true,
      message: 'Invalid zip code',
    })
    .required(),
});

const companyOccupationValidationSchema = yup.object().shape({
  companyName: yup.string().required(),
  organizationType: yup.string().required(),
  businessStyle: yup.string().required(),
  yearStablished: yup.number().required(),
});

export { personalInfoFormvalidationSchema, companyOccupationValidationSchema };
