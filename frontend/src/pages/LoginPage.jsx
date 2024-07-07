import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Component/Headers';
import Spinner from '../Component/spinner'; // Assuming you have a Spinner component
import { GrLogin } from "react-icons/gr";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const [isLoading, setIsLoading] = useState(false); // State to manage loading spinner
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show spinner when form is submitted

    try {
      
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   }
      // };

      const response = await axios.post(process.env.REACT_APP_SERVER_URI + '/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      console.log("token saved")

      localStorage.setItem('user', JSON.stringify(response.data));

      const userRole = response.data.role;
      if (userRole === 'member') {
        navigate('/member');
      } else if (userRole === 'teamManager') {
        navigate('/manager');
      } else if (userRole === 'admin') {
        navigate('/admin');
      }
    } catch (error) {
      console.error(error.response ? error.response.data.message : error.message);
      alert(error.message);

    } finally {
      setIsLoading(false); // Hide spinner after login attempt (success or failure)
    }
  };

  return (
    <>
      <Header />
      <div className='container'>
        <h1>Login<GrLogin /></h1>
        
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <button type='submit' className='btn btn-block'>
            Login
          </button>
          {isLoading && <Spinner />} {/* Show spinner when isLoading is true */}
        </form>
      </div>
    </>
  );
}

export default LoginPage;
