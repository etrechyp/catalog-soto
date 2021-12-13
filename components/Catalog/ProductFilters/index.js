import { useContext } from 'react';
import { Box, Chip } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { CatalogContext } from '../../../context/CatalogContext';

export default function ProductFilters({}) {
  const { catalogState, dispatchCatalog } = useContext(CatalogContext);
  const { filters } = catalogState;
  const filtersArray = Object.keys(filters).map((key) => ({
    name: key,
    [key]: filters[key],
  }));

  const handleDelete = (filter) => {
    dispatchCatalog({type: 'REMOVE_FILTERS', filter: filter.name, filtersApplied: filters})
  };

  return (
    <Box>
      {filtersArray.map((filter) => {
        if (filter[filter.name] !== "") {
          return (
            <Chip
              key={uuidv4()}
              label={`${filter.name}: ${filter[filter.name]}`}
              variant='outlined'
              sx={{ margin: '0rem 0.5rem' }}
              onDelete={() => handleDelete(filter)}
            />
          );
        }

        return null;
      })}
    </Box>
  );
}
