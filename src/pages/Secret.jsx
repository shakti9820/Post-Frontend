import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logout from '../pages/Logout';
import { getData, mySecretPostsRoute } from '../utils/apiRoutes';
import axios from 'axios';

const Secret = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate('/login');
        } else {
          const token = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const { data } = await axios.get(`${getData}`);
          setCurrentUser(data);
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem(process.env.REACT_APP_LOCALHOST_KEY);
        navigate('/login');
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleMySecretPosts = async () => {
    try {
      const response = await axios.get(mySecretPostsRoute);
      // Handle the response as needed (e.g., display data, update state)
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching my secret posts:', error.message);
      // Handle error as needed
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h1>Secret Page</h1>
      <div className="d-flex justify-content-between mt-3">
        <div>
          <Link className="btn btn-success m-3" to="/add">
            Add Secret Post
          </Link>
          <Link className="btn btn-success m-3" to="/show">
            Show Secret Posts
          </Link>
        </div>
        <div>
          <Link className="btn btn-primary me-2 m-3" to="/mypost">
            My Posts
          </Link>
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Secret;
