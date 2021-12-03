import {
  Box,
  InputLabel,
  FormControl,
  Select,
  FormHelperText,
  MenuItem,
} from '@mui/material';
import { useField } from 'formik';

const MySelect = ({ items, label, sx, targetKey, ...props }) => {
  const [field, meta] = useField(props);
  const error = meta.error && meta.touched && meta.error;

  const typeOfOption = typeof items[0] === 'object' ? 'object' : 'whatever';

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
              const optionValue =
                typeOfOption === 'object' ? item[targetKey] : item;
              return (
                <MenuItem key={optionValue} value={optionValue}>
                  {typeOfOption === 'object' ? item.name : item}
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

export default MySelect;
