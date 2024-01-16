// AddSecretPost.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { postRoute } from '../utils/apiRoutes';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const AddSecretPost = () => {
  const navigate=useNavigate();
  const [content, setContent] = useState('');

  const handleAddPost = async () => {
    try {
      // Make a POST request to your server endpoint
      const response = await axios.post(postRoute, {
        content: content,
        // Add other fields as needed
      });
      // Assuming your server returns the created post data
      const newPostData = response.data;
      // Clear the input field
      setContent('');
    } catch (error) {
      console.error('Error adding post:', error.message);
      // Handle error as needed
    }
  };

  const back=()=>{
    navigate("/");
  }

  return (
    <div>
      <h2>Add Secret Post</h2>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Content:
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <button type="button" className="btn btn-primary" onClick={handleAddPost}>
        Add Post
      </button>
      <div style={{ marginTop : "10%" }}>
      <Button variant="primary" onClick={back}>Back</Button>

      </div>
    </div>

     
  );
};

export default AddSecretPost;


