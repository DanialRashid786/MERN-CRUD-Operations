import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Table from '../Components/Table';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Allusers() {
  const [users, setUsers] = useState([]);

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

  const columns = [
    'No',
    'First Name',
    'Last Name',
    'Email',
    'Address',
    'Created At',
    'Updated At',
    'Update',
    'Delete'
  ];

  const data = users.map((user, index) => ({
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
          <Table columns={columns} data={data} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Allusers;
