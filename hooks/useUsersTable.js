import { useState, useEffect, createRef } from 'react';

const useUsersTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const tableRef = createRef();

  return {
    data,
    isLoading,
    tableRef,
  };
};

export default useUsersTable;
