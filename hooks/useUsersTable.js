import { useState, useEffect, createRef } from 'react';
import { refreshToken } from '../helper/index';

const useUsersTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllUsers = async () => {
    try {
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
        return;
      } else if (data.msg === 'token invalid') {
        refreshToken();
        getAllUsers();
      }
    } catch (err) {
      console.log(err);
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

    if (responseData.ok === 'true') {
      const updatedData = data.map((user) => {
        if (user.uid === uid) {
          user = newData;
        }

        return user;
      });
      setData(updatedData);
    } else if (responseData.msg === 'token invalid') {
      refreshToken();
      updateUser(uid, newData);
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

    if (responseData.ok === 'true') {
      const filteredData = data.filter((user) => user.uid !== uid);
      setData(filteredData);
    } else if (responseData.msg === 'token invalid') {
      refreshToken();
      deleteUser(uid);
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
    deleteUser,
  };
};

export default useUsersTable;
