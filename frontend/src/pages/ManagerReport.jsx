import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../Component/spinner';
import LogoutHeader from '../Component/LogoutHeader';
import CommentSection from '../Component/Comment';

const ManagerReport = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        const token = userInfo.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        setIsLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/tasks/getTask`, config);
        setTasks(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchTasks();
    
  }, []);
 

  return (
    <>
      <LogoutHeader />
      <div>
        <h4>Assigned Tasks Status</h4>
        {isLoading && <Spinner />}
        <div className="tasks">
          {tasks.map(task => (
             <div key={task._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', textAlign: 'left' }}>
              <p><strong>Title:</strong> {task.title}</p>
              <p><strong>Discription:</strong> {task.description}</p>
              <p><strong>Status: </strong> {task.status}</p>
              <p><strong>Assigned to: </strong>{task.assignedTo.name}</p>
              <p><strong>Due Date:</strong> {task.dueDate}</p>
              <CommentSection taskId={task._id} />
            </div>
            
          ))}
        </div>
      </div>
    </>
  );
}

export default ManagerReport;
