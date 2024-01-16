import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {registerRoute} from "../utils/apiRoutes"

const Register = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {

    console.log(registerRoute);

    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, []);
     
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage('Invalid email format.');
      return;
    }

    if (formData.password.length < 5) {
      setErrorMessage('Password must be at least 5 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Clear previous messages
    setErrorMessage('');
    setSuccessMessage('');

    // Make API call to store user data
    try {
      const response = await fetch(registerRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      

      


      if (response.ok) {
        setSuccessMessage('Registration successful!');
        // Optionally, you can redirect the user to a login page or do something else
        const res=response.json();
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          (res.token)
        );

        // console.log(response);


        navigate("/");


      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Registration failed.');
      }
    } catch (error) {
      setErrorMessage('Error connecting to the server.');
    }
  };

  return (
    <form className="container mt-5">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
      <button
        type="submit"
        className="btn btn-primary"
        onClick={handleSubmit}
      >
        Register
      </button>
    </form>
  );
};

export default Register;
