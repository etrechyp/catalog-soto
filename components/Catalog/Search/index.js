import {
  Select,
  MenuItem,
  TextField,
  Button,
  InputLabel,
  FormControl,
} from '@mui/material';
import { FaSearch } from 'react-icons/fa';

export default function Search({ languageSelected }) {

  return (
    <FormControl sx={{ display: 'flex', flexDirection: 'row' }}>
      <InputLabel id='categories-select'>{languageSelected['CATEGORIES']}</InputLabel>
      <Select
        labelId='categories-select'
        value='one'
        label={languageSelected['CATEGORIES']}
        // onChange={handleChange}
        sx={{
          flex: 1,
          flexGrow: 2,
          borderTopRightRadius: '0px',
          borderBottomRightRadius: '0px'
        }}
      >
        <MenuItem value={'one'}>Ten</MenuItem>
        <MenuItem value={'two'}>Twenty</MenuItem>
        <MenuItem value={'three'}>Thirty</MenuItem>
      </Select>
      <TextField
        id='outlined-search'
        label={languageSelected['SEARCH_PLACEHOLDER']}
        type='search'
        sx={{
          flex: '1',
          flexGrow: 10,
          [`& fieldset`]: {//removes border radius from mui textfield variant outlined
            borderRadius: 0,
          },
        }}
        style={{

        }}
      />
      <Button
        variant='outlined'
        startIcon={<FaSearch />}
        sx={{
          flex: 1,
          flexGrow: 2,
          borderTopLeftRadius: '0px',
          borderBottomLeftRadius: '0px'
        }}
      >
        {languageSelected['SEARCH']}
      </Button>
    </FormControl>
  );
}
