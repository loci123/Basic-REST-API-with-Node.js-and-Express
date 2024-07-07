// Report.js
import React, { useState, useEffect } from 'react';
import TaskService from '../features/service';
function Report() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks and their details (progress, comments) from your backend or local storage
    async function fetchTasks() {
      try {
        const fetchedTasks = await TaskService.getAllTasks(); // Replace with your actual API call or data fetching
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Task Status Report</h2>
      {tasks.map(task => (
        <div key={task.id}>
          <h3>{task.name}</h3>
          <p>Progress: {task.progress}</p>
          <h4>Comments:</h4>
          <ul>
            {task.comments.map(comment => (
              <li key={comment.id}>{comment.text} - {comment.user}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Report;
