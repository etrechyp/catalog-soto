import { TextField } from '@mui/material';
import { useField } from 'formik';

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

export default MyTextField;
