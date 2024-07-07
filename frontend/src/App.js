import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import MemberDashboard from './pages/MemberDashboard';
import LoginPage from './pages/LoginPage';
import Manager from './pages/Manager';
import Admin from './pages/Admin';
import ManagerReport from './pages/ManagerReport';
import { io } from 'socket.io-client';

function App() {
  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", (message) => {

      console.log('Connected to WebSocket server', socket.id);
      socket.on("Hello World", (message) => {
        console.log('Received message:', message);
      });
    });
    socket.on("newComment", (message) => {
      console.log('Received comment:', message);
    });
    
    

    socket.on("disconnect", () => {
      console.log('Disconnected from WebSocket server');
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Router>
      <div className='container'>
        <Routes>
          {/* Redirect to /login by default */}
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/member' element={<MemberDashboard />} />
          <Route path='/register' element={<Register />} />
          <Route path='/manager' element={<Manager />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/report' element={<ManagerReport />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
