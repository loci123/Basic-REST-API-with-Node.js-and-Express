import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../Component/spinner';

function TaskList() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
  });

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/users/admin/getUsers`, config);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const { title, description, assignedTo, dueDate } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = JSON.parse(localStorage.getItem('user')).token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URI}/api/tasks`, formData, config);
      console.log(response.data);

      // Reset the form after successful submission
      setFormData({
        title: '',
        description: '',
        assignedTo: '',
        dueDate: '',
      });
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Spinner />}
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Title"
            required
          />
        </div>
        <div className='form-group'>
          <textarea
            name="description"
            value={description}
            onChange={onChange}
            placeholder="Description"
          />
        </div>
        <div className='form-group'>
          <select name="assignedTo" value={assignedTo} onChange={onChange} required>
            <option value="">Assign to...</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={onChange}
            required
          />
        </div>
        <button type='submit' className='btn btn-block'>Create Task</button>
      </form>
    </>
  );
}

export default TaskList;
