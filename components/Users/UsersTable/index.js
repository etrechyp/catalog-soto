import { Box } from '@mui/material';
import MaterialTable from '@material-table/core';
import props from './props';
import useUsersTable from '../../../hooks/useUsersTable';

export default function UsersTable({
  languageSelected,
  handleOpen,
  setSelectedUser,
}) {
  const { data, isLoading, tableRef, updateUser, deleteUser } = useUsersTable();

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
      <MaterialTable
        {...props(
          languageSelected,
          data,
          tableRef,
          isLoading,
          updateUser,
          deleteUser,
          handleOpen,
          setSelectedUser
        )}
      />
    </Box>
  );
}
