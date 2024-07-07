// TaskService.js
import axios from 'axios';

const TaskService = {
  getTasks: async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/tasks/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw new Error('Failed to fetch tasks');
    }
  },
};

export default TaskService;
