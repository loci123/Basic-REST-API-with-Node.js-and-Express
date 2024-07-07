import React, { useState } from 'react';
import axios from 'axios';
import { FaHandPointDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Header from '../Component/Headers';
import Spinner from '../Component/spinner';

function Register() {
  const [isLoading, setIsLoading] = useState(false); // State to manage loading spinner

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'member'
  });
  const { name, email, password, confirmPassword, role } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      console.error('Passwords do not match, please enter the correct password');
      alert('Passwords do not match');
    } else {
      try {
        const response = await axios.post(process.env.REACT_APP_SERVER_URI + '/api/users/register', formData);
        console.log(response.data);
        
        // Save token in local storage
        localStorage.setItem('userToken', response.data.token);

        // Navigate to login page or dashboard
        navigate('/login');
      } catch (error) {
        console.error(error.response ? error.response.data.message : error.message);
      }
    }
    setIsLoading(false)
  };

  return (
    <>
       <Header />
      <div className='container'>
        <h1><FaHandPointDown />Register Yourself<FaHandPointDown /></h1>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              required
            />
          </div>
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
          <div className='form-group'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              value={confirmPassword}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='role'>Role</label>
            <div className='radio-group'>
              <div>
                <input
                  type='radio'
                  id='member'
                  name='role'
                  value='member'
                  checked={role === 'member'}
                  onChange={onChange}
                />
                <label htmlFor='member'>Member</label>
              </div>
              <div>
                <input
                  type='radio'
                  id='admin'
                  name='role'
                  value='admin'
                  checked={role === 'admin'}
                  onChange={onChange}
                />
                <label htmlFor='admin'>Admin</label>
              </div>
              <div>
                <input
                  type='radio'
                  id='teamManager'
                  name='role'
                  value='teamManager'
                  checked={role === 'teamManager'}
                  onChange={onChange}
                />
                <label htmlFor='teamManager'>Manager</label>
              </div>
            </div>
          </div>
          <button type='submit' className='btn btn-block'>
            Register
          </button>
          {isLoading && <Spinner />}
        </form>
      </div>
    </>
  );
}

export default Register;
