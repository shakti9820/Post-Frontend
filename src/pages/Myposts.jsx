import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { mySecretPostsRoute } from '../utils/apiRoutes';
import { Link, useNavigate } from 'react-router-dom';

const Myposts = () => {
  const navigate = useNavigate();
  const [mySecretPosts, setMySecretPosts] = useState([]);

  useEffect(() => {
    const fetchMySecretPosts = async () => {
      try {
        const response = await axios.get(mySecretPostsRoute);
        setMySecretPosts(response.data);
      } catch (error) {
        console.error('Error fetching my secret posts:', error.message);
        // Handle error as needed
      }
    };

    fetchMySecretPosts();
  }, []);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Secret Posts</h1>
      <div className="overflow-auto" style={{ maxHeight: '400px' }}>
        {mySecretPosts.length === 0 ? (
          <p>No secret posts available.</p>
        ) : (
          <ul className="list-group">
            {mySecretPosts.map((post) => (
              <li key={post._id} className="list-group-item">
                {post.content} {/* Display other post details as needed */}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-3">
        <Link className="btn btn-primary" to="/" onClick={handleBack}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default Myposts;
