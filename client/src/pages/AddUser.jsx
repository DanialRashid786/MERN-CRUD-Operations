import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Adduserform() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/user', formData);
      alert('User added successfully!');
      navigate('/users'); // Redirect to the users page after adding
    } catch (error) {
      console.error('Error adding user:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center p-5">
        <div className="card w-full max-w-lg shadow-lg bg-base-100 p-5">
          <h2 className="text-2xl font-bold mb-5 text-center">Add New User</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label htmlFor="first_name" className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="input input-bordered"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control mb-4">
              <label htmlFor="last_name" className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="input input-bordered"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control mb-4">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input input-bordered"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control mb-4">
              <label htmlFor="address" className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="input input-bordered"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">Add User</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Adduserform;
