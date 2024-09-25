import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserForm({ userId }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: ''
  });

  // Fetch user data if userId is present (for update)
  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/user/${userId}`);
          setFormData({
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
            address: response.data.address
          });
        } catch (error) {
          console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        }
      };
      fetchUser();
    }
  }, [userId]);

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
      if (userId) {
        // If updating an existing user
        await axios.patch(`http://localhost:8000/user/${userId}`, formData);
        alert('User updated successfully!');
      } else {
        // If creating a new user
        await axios.post('http://localhost:8000/user', formData);
        alert('User added successfully!');
      }
      navigate('/users'); // Redirect to the users page after operation
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center m-5">{userId ? 'Update User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          {userId ? 'Update User' : 'Add User'}
        </button>
      </form>
    </div>
  );
}

export default UserForm;
