import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Table from '../Components/Table';
import axios from 'axios';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'




function Allusers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user');
        setUsers(response.data); // Check response format
      } catch (error) {
        console.error('Error while fetching data', error.response ? error.response.data : error.message);
      }
    };

    fetchData(); // Call fetchData inside useEffect
  }, []);

  // Define the columns based on your data structure
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

  // Transform `users` data to fit the table format
  const data = users.map( (user,index) => ({
    'No':index+1,
    'First Name': user.first_name,
    'Last Name': user.last_name,
    'Email': user.email,
    'Address': user.address,
    'Created At': new Date(user.createdAt).toLocaleDateString(),
    'Updated At': new Date(user.updatedAt).toLocaleDateString(),
    'Update': <FontAwesomeIcon icon={faCoffee} />
    ,
    'Delete': <button type="button"></button> 
    
  }));

  console.log('Fetched Users:', users); // Debug the data coming from API

  return (
    <>
      <Header />

      <div className="container">
        <button className="btn btn-outline btn-success m-5">Add User</button>
        <h1 className="text-center underline">Users Table</h1>

        {/* Render Table component with dynamic columns and data */}
        <Table columns={columns} data={data} />
      </div>

      <Footer />
    </>
  );
}

export default Allusers;
