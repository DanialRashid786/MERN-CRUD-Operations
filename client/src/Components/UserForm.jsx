import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";

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
          toast.error('Error fetching user data.');
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
        // Update user
        await axios.patch(`http://localhost:8000/user/${userId}`, formData);
        toast.success(`User updated successfully! {userId}`);
      } else {
        // Add new user
        await axios.post('http://localhost:8000/user', formData);
        toast.success('User added successfully!');
      }
      navigate('/users'); // Redirect after form submission
    } catch (error) {
      toast.error('Error submitting form.');
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex justify-center items-center p-5">
      <div className="card w-full max-w-lg shadow-lg bg-base-100 p-5">
        <h2 className="text-2xl font-bold mb-5 text-center">
          {userId ? 'Update User' : 'Add New User'}
        </h2>
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
          <button type="submit" className="btn btn-primary w-full">
            {userId ? 'Update User' : 'Add User'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
