import { useState, useContext } from 'react';
import {
  Select,
  MenuItem,
  TextField,
  Button,
  InputLabel,
  FormControl,
} from '@mui/material';
import { FaSearch } from 'react-icons/fa';
import { CatalogContext } from '../../../context/CatalogContext';

const categoriesSelectData = [
  {
    id: '',
    name: '',
  }
]

export default function Search({ languageSelected }) {
  const { catalogState, dispatchCatalog } = useContext(CatalogContext);
  const [search, setSearch] = useState('');

  return (
    <FormControl sx={{ display: 'flex', flexDirection: 'row' }}>
      <InputLabel id='categories-select'>
        {languageSelected['CATEGORIES']}
      </InputLabel>
      <Select
        labelId='categories-select'
        value=''
        label={languageSelected['CATEGORIES']}
        // onChange={handleChange}
        sx={{
          flex: 1,
          flexGrow: 2,
          borderTopRightRadius: '0px',
          borderBottomRightRadius: '0px',
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
          [`& fieldset`]: {
            //removes border radius from mui textfield variant outlined
            borderRadius: 0,
          },
        }}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <Button
        variant='outlined'
        startIcon={<FaSearch />}
        sx={{
          flex: 1,
          flexGrow: 2,
          borderTopLeftRadius: '0px',
          borderBottomLeftRadius: '0px',
        }}
        onClick={() => dispatchCatalog({ type: 'APPLY_FILTERS', search, brand: catalogState.filters.brand })}
      >
        {languageSelected['SEARCH']}
      </Button>
    </FormControl>
  );
}
