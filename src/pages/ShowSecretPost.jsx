// // ShowSecretPost.jsx

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { getpostRoute } from '../utils/apiRoutes';
// import { Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const ShowSecretPost = () => {
//   const navigate=useNavigate();
//   const [secretPosts, setSecretPosts] = useState([]);

//   useEffect(() => {
//     // Fetch secret posts from the server when the component mounts
//     fetchSecretPosts();
//   }, []);

//   const fetchSecretPosts = async () => {
//     try {
//       // Make a GET request to fetch secret posts from your server
//       const response = await axios.get(getpostRoute);

//       // Assuming your server returns an array of secret posts
//       const fetchedPosts = response.data;

//       // Update the state with fetched secret posts
//       setSecretPosts(fetchedPosts);
//     } catch (error) {
//       console.error('Error fetching secret posts:', error.message);
//       // Handle error as needed
//     }
//   };
  
//   const back=()=>{
//     navigate("/");
//   }

//   return (
//     <>
//     <div style={{margin:"20%"}}>
//       <h2>Show Secret Posts</h2>
//       {secretPosts.length === 0 ? (
//         <p>No secret posts available.</p>
//       ) : (
//         <ul>
//           {secretPosts.map((post) => (
//             <li key={post.id}>
//               {post.content} {/* Display other post details as needed */}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>

// <div>
//   <div></div>
// <Button variant="primary" onClick={back}>Back</Button>

// </div>
// </>
//   );
// };

// export default ShowSecretPost;




// ShowSecretPost.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getpostRoute } from '../utils/apiRoutes';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ShowSecretPost = () => {
  const navigate = useNavigate();
  const [secretPosts, setSecretPosts] = useState([]);

  useEffect(() => {
    // Fetch secret posts from the server when the component mounts
    fetchSecretPosts();
  }, []);

  const fetchSecretPosts = async () => {
    try {
      // Make a GET request to fetch secret posts from your server
      const response = await axios.get(getpostRoute);

      // Assuming your server returns an array of secret posts
      const fetchedPosts = response.data;

      // Update the state with fetched secret posts
      setSecretPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching secret posts:', error.message);
      // Handle error as needed
    }
  };

  const back = () => {
    navigate("/");
  };

  return (
    <>
      <div style={{ margin: "5%" }}>
        <h2>Show Secret Posts</h2>
        <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
          {secretPosts.length === 0 ? (
            <p>No secret posts available.</p>
          ) : (
            <div>
              {secretPosts.map((post) => (
                <Card key={post.id} className="mb-3">
                  <Card.Body>
                    <Card.Text>{post.content}</Card.Text>
                    {/* Display other post details as needed */}
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <div >
        <Button variant="primary" onClick={back}>Back</Button>
      </div>
    </>
  );
};

export default ShowSecretPost;
