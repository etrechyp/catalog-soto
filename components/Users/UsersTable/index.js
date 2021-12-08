import { Box } from '@mui/material';
import MaterialTable from '@material-table/core';
import props from './props';

export default function UsersTable({
  data,
  isLoading,
  tableRef,
  languageSelected,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: {
          xs: '600px',
          sm: '900px',
        },
        // bgcolor: 'lightblue'
      }}
    >
      <MaterialTable tableRef={tableRef} {...props} />
    </Box>
  );
}
