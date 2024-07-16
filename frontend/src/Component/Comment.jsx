import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const CommentSection = ({ taskId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Initialize socket connection
    const socket = io(process.env.REACT_APP_SERVER_URI, {
      query: { token: localStorage.getItem('token') },
    });

    // Listen for 'newComment' event
    socket.on('newComment', () => {
      fetchComments();
    });

    // Fetch comments on component mount
    fetchComments();

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/comments/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      alert('Error fetching comments');
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/comments/${taskId}`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Comment added successfully:', response.data);
      setNewComment(''); // Clear the input field
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };

  return (
    <div className="comment-section">
      <h4>Comments</h4>
      <div className="comments">
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            <p><strong>{comment.userId.name}:</strong> {comment.text}</p>
          </div>
        ))}
      </div>
      <div className="add-comment">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button className="btn" onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default CommentSection;
