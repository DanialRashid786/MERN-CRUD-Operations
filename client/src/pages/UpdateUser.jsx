import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import UserForm from '../Components/UserForm';

function UpdateUser() {
  const { id } = useParams(); // Get userId from the URL

  return (
    <>
      <Header />
      <UserForm userId={id} /> {/* Pass the userId to the form component */}
      <Footer />
    </>
  );
}

export default UpdateUser;
