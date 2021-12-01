import {
  Select,
  MenuItem,
  TextField,
  Button,
  InputLabel,
  FormControl,
} from '@mui/material';
import { FaSearch } from 'react-icons/fa';

export default function Search() {
  return (
    <FormControl sx={{ display: 'flex', flexDirection: 'row' }}>
      <InputLabel id='categories-select'>Categorias</InputLabel>
      <Select
        labelId='categories-select'
        value='one'
        label='Categorias'
        // onChange={handleChange}
        sx={{
          flex: 1,
          flexGrow: 2,
        }}
      >
        <MenuItem value={'one'}>Ten</MenuItem>
        <MenuItem value={'two'}>Twenty</MenuItem>
        <MenuItem value={'three'}>Thirty</MenuItem>
      </Select>
      <TextField
        id='outlined-search'
        label='Search field'
        type='search'
        sx={{
          flex: '1',
          flexGrow: 10,
        }}
      />
      <Button
        variant='outlined'
        startIcon={<FaSearch />}
        sx={{
          flex: 1,
          flexGrow: 2,
        }}
      >
        Buscar
      </Button>
    </FormControl>
  );
}
