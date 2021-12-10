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

  useEffect(() => {
    getAllUsers();
  }, []);

  const tableRef = createRef();

  return {
    data,
    isLoading,
    tableRef,
    updateUser, 
    deleteUser
  };
};

export default useUsersTable;
