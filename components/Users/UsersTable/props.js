import { forwardRef } from 'react';
import InfoIcon from '@mui/icons-material/Info';

const tableIcons = {
  Info: forwardRef(function InfoIcon(props, ref) {
    return <InfoIcon {...props} ref={ref} />;
  }),
};

const props = (
  languageSelected,
  data,
  tableRef,
  isLoading,
  updateUser,
  deleteUser,
  handleOpen,
  setSelectedUser
) => ({
  tableRef,
  loading: isLoading,
  title: languageSelected['MANAGE_ACCOUNTS'],
  columns: [
    { title: 'ID', field: 'id', hidden: true, editable: 'never' },
    {
      title: languageSelected['FIRST_NAME'],
      field: 'firstName',
      editable: 'never',
    },
    {
      title: languageSelected['LAST_NAME'],
      field: 'lastName',
      editable: 'never',
    },
    { title: 'Email', field: 'email', editable: 'never' },
    {
      title: languageSelected['COMPANY_NAME'],
      field: 'companyName',
      editable: 'never',
    },
    {
      title: languageSelected['BUSINESS_STYLE'],
      field: 'businessStyle',
      lookup: {
        Store: 'Store',
        Wholesaler: 'Wholesaler',
      },
    },
    {
      title: 'Admin',
      field: 'isAdmin',
      type: 'boolean',
    },
    {
      title: languageSelected['VERIFIED'],
      field: 'verified',
      type: 'boolean',
    },
  ],
  icons: tableIcons,
  editable: {
    onRowUpdate: async (newData, oldData) => {
      delete newData.tableData;

      await updateUser(newData.uid, newData);
    },
    onRowDelete: async (oldData) => {
      await deleteUser(oldData.uid); //borra un usuario con el endpoint /api/users/:user-id
    },
  },
  options: {
    paginationType: 'normal',
    draggable: false,
  },
  data: data,
  localization: {
    pagination: {
      labelDisplayedRows: languageSelected['TABLE_PAGINATION_COUNT'],
      labelRowsPerPage: languageSelected['ROWS_PER_PAGE'],
      labelRowsSelect: languageSelected['ROWS'],
    },
    header: {
      actions: languageSelected['ACTIONS'],
    },
    toolbar: {
      searchPlaceholder: languageSelected['SEARCH'],
    },
    body: {
      editTooltip: languageSelected['EDIT'],
      deleteTooltip: languageSelected['DELETE'],
      editRow: {
        deleteText: languageSelected['DELETE_USER_MESSAGE'],
      },
    },
  },
  actions: [
    {
      icon: InfoIcon,
      tooltip: 'View details',
      onClick: (event, rowData) => {
        handleOpen();
        setSelectedUser(rowData);
      },
    },
  ],
});

export default props;
