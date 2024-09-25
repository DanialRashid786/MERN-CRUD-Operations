import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import UserForm from '../Components/UserForm';

function AddUser() {
  return (
    <>
      <Header />
      <UserForm /> {/* No userId passed, so this will add a new user */}
      <Footer />
    </>
  );
}

export default AddUser;
