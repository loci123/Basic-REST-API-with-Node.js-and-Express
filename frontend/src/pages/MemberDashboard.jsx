import React, { useEffect, useState } from 'react';
import LogoutHeader from '../Component/LogoutHeader';
import axios from 'axios';
import Spinner from '../Component/spinner';
import CommentSection from '../Component/Comment';

function MemberDashboard() {
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (userInfo) {
      setUser(userInfo);
      fetchTasks(userInfo._id);
    }
  }, []);

  const fetchTasks = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/tasks/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      alert('Error fetching tasks:');
    }
  };

  const handleCloseTask = async (taskId) => {
    try {
      setIsLoading(true);
      await axios.delete(`${process.env.REACT_APP_SERVER_URI}/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
    setIsLoading(false);
  };

  return (
    <>
      <LogoutHeader />
      <div className="container">
        <h4>Member</h4>
        <h1>Welcome {user.name}</h1>
        <h2>Your Tasks:</h2>
        <section className="content">
          {tasks.length > 0 ? (
            <div className="tasks">
              {tasks.map((task) => (
                <div className="task-row" key={task._id}>
                  <div className="task-details">
                    <p><span className="task-label">Title:</span> {task.title}</p>
                    <p><span className="task-label">Description:</span> {task.description}</p>
                    <p><span className="task-label">Status:</span> {task.status}</p>
                    <CommentSection taskId={task._id} />
                  </div>
                  <button className="close-button" onClick={() => handleCloseTask(task._id)}>Done</button>
                  {isLoading && <Spinner />}
                </div>
              ))}
            </div>
          ) : (
            <h3>You have no tasks assigned.</h3>
          )}
        </section>
      </div>
    </>
  );
}

export default MemberDashboard;

