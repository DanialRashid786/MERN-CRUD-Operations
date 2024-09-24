import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Table from '../Components/Table'

function Allusers() {

    const columns = ['Name', 'Age', 'Email'];
  const data = [
    { Name: 'John Doe', Age: 28, Email: 'john@example.com' },
    { Name: 'Jane Smith', Age: 34, Email: 'jane@example.com' },
  ];

  return (
<>

   <Header/>

    <h1>Users Table</h1>
    <Table columns={columns} data={data} />

    <Footer/>


</>
  )
}

export default Allusers