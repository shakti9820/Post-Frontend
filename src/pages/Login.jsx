import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginRoute } from '../utils/apiRoutes';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!formData.email || !formData.password) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrorMessage('Invalid email format.');
      return;
    }

    // Clear previous messages
    setErrorMessage('');
    setSuccessMessage('');

    // Make API call to authenticate user
    try {
      const response = await fetch(loginRoute, {
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
        setSuccessMessage('Login successful!');
        // Optionally, you can redirect the user to a dashboard or do something else
        const res = await response.json();
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, res.token);

        navigate('/');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login failed.');
      }
    } catch (error) {
      setErrorMessage('Error connecting to the server.');
    }
  };

  return (
    <form className="container mt-5">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
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
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
      <button type="submit" className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
      <div className="mt-3">
        <p>
          Don't have an account?{' '}
          <Link to="/register" className="btn btn-link">
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
