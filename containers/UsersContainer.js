import { useState, useContext, useEffect, forwardRef, createRef } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import DashboardLayout from '../layouts/dashboard';
import AuthContextProvider from '../context/AuthContext';
import UsersTable from '../components/Users/UsersTable';
import UserModal from '../components/Users/UserModal';
import useModal from '../hooks/useModal';

export default function UsersContainer() {
  const { languageSelected } = useContext(LanguageContext);
  const { open, handleOpen, handleClose } = useModal();
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <AuthContextProvider>
      <DashboardLayout>
        <UsersTable
          languageSelected={languageSelected}
          handleOpen={handleOpen}
          setSelectedUser={setSelectedUser}
        />
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
