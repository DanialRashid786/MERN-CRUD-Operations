import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Table from '../Components/Table';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

function Allusers() {
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error while fetching data', error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/user/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error.response ? error.response.data : error.message);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortConfig.key) {
      const aKey = sortConfig.key === 'createdAt' || sortConfig.key === 'updatedAt' ? new Date(a[sortConfig.key]) : a[sortConfig.key];
      const bKey = sortConfig.key === 'createdAt' || sortConfig.key === 'updatedAt' ? new Date(b[sortConfig.key]) : b[sortConfig.key];

      if (aKey < bKey) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aKey > bKey) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const columns = [
    { label: 'No', key: 'index' },
    { label: 'First Name', key: 'first_name' },
    { label: 'Last Name', key: 'last_name' },
    { label: 'Email', key: 'email' },
    { label: 'Address', key: 'address' },
    { label: 'Created At', key: 'createdAt', sortable: true },
    { label: 'Updated At', key: 'updatedAt', sortable: true },
    { label: 'Update', key: 'update' },
    { label: 'Delete', key: 'delete' }
  ];

  const data = sortedUsers.map((user, index) => ({
    'No': index + 1,
    'First Name': user.first_name,
    'Last Name': user.last_name,
    'Email': user.email,
    'Address': user.address,
    'Created At': new Date(user.createdAt).toLocaleDateString(),
    'Updated At': new Date(user.updatedAt).toLocaleDateString(),
    'Update': (
      <Link to={`/updateuser/${user._id}`} className="btn btn-sm btn-primary">
        <FontAwesomeIcon icon={faEdit} /> Edit
      </Link>
    ),
    'Delete': (
      <button
        type="button"
        className="btn btn-outline btn-error"
        onClick={() => handleDelete(user._id)}
      >
        <FontAwesomeIcon icon={faTrash} /> Delete
      </button>
    )
  }));

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <FontAwesomeIcon icon={faSort} />;
    }
    if (sortConfig.direction === 'asc') {
      return <FontAwesomeIcon icon={faSortUp} />;
    }
    return <FontAwesomeIcon icon={faSortDown} />;
  };

  return (
    <>
      <Header />
      <div className="container mx-auto my-10 p-5">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Users Table</h1>
          <Link to="/addnewuser" className="btn btn-success">
            Add User
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="p-2"
                    onClick={() => column.sortable && handleSort(column.key)}
                    style={{ cursor: column.sortable ? 'pointer' : 'default' }}
                  >
                    {column.label} {column.sortable && getSortIcon(column.key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={column.key} className="p-2">
                      {row[column.label]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Allusers;
