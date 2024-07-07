import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutHeader from '../Component/LogoutHeader';
import TaskList from '../Component/TaskList';

const Manager = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  return (
    <>
      <div className="status-Container">
        <Link to="/report" className="status">View Status</Link>
      </div>
      <LogoutHeader />
      <div>
        <h4>Team Manager</h4>
        <h1>Welcome {user.name}</h1>
        <TaskList userId={user._id} />
      </div>
    </>
  );
}

export default Manager;
