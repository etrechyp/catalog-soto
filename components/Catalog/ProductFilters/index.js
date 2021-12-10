import { Box, Chip } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export default function ProductFilters({}) {
  const filters = ['Brand: Avon', 'Category: Health care'];

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <Box>
      {filters.map((filter) => {
        return (
          <Chip
            key={uuidv4()}
            label={filter}
            variant='outlined'
            sx={{ margin: '0rem 0.5rem' }}
            onDelete={handleDelete}
          />
        );
      })}
    </Box>
  );
}
