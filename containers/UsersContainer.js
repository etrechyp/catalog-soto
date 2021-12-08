import { useState, useContext, useEffect, forwardRef, createRef } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import DashboardLayout from '../layouts/dashboard';
import AuthContextProvider from '../context/AuthContext';
import UserModal from '../components/Users/UserModal';
import { Box } from '@mui/material';
import MaterialTable from '@material-table/core';
import InfoIcon from '@mui/icons-material/Info';
import useModal from '../hooks/useModal';

const tableIcons = {
  Info: forwardRef((props, ref) => <InfoIcon {...props} ref={ref} />),
};

export default function UsersContainer() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { languageSelected } = useContext(LanguageContext);
  const { open, handleOpen, handleClose } = useModal();
  const [selectedUser, setSelectedUser] = useState(null);

  const getAllUsers = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await fetch(
      'http://192.168.88.2:8082/api/users?limit=30&from=0',
      {
        headers: {
          token,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (data.ok) {
      setData(data.users);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const updateUser = async (uid, newData) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const body = JSON.stringify(newData);
    const response = await fetch(`http://192.168.88.2:8082/api/users/${uid}`, {
      method: 'PUT',
      headers: {
        token,
        'Content-Type': 'application/json',
      },
      body,
    });

    const responseData = await response.json();

    //debugger;
    if (responseData.ok === 'true') {
      const updatedData = data.map((user) => {
        if (user.uid === uid) {
          user = newData;
        }

        return user;
      });
      setData(updatedData);
    } else setData(data);
  };

  const deleteUser = async (uid) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await fetch(`http://192.168.88.2:8082/api/users/${uid}`, {
      method: 'DELETE',
      headers: {
        token,
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();

    //debugger;
    if (responseData.ok === 'true') {
      const filteredData = data.filter((user) => user.uid !== uid);
      setData(filteredData);
    } else setData(data);
  };

  const tableRef = createRef();

  return (
    <AuthContextProvider>
      <DashboardLayout>
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
            isLoading={isLoading}
            tableRef={tableRef}
            actions={[
              {
                icon: InfoIcon,
                tooltip: 'View details',
                onClick: (event, rowData) => {
                  handleOpen();
                  setSelectedUser(rowData);
                },
              },
            ]}
            icons={tableIcons}
            columns={[
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
            ]}
            editable={{
              onRowUpdate: async (newData, oldData) => {
                delete newData.tableData;

                console.log('new', newData);
                console.log('old', oldData);

                await updateUser(newData.uid, newData);
              },
              onRowDelete: async (oldData) => {
                await deleteUser(oldData.uid); //borra un usuario con el endpoint /api/users/:user-id
              },
            }}
            options={{
              paginationType: 'normal',
              draggable: false,
            }}
            data={data}
            title={languageSelected['MANAGE_ACCOUNTS']}
            localization={{
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
            }}
          />
        </Box>
        <UserModal
          open={open}
          handleClose={handleClose}
          selectedUser={selectedUser}
          languageSelected={languageSelected}
        />
      </DashboardLayout>
    </AuthContextProvider>
  );
}
