import React from 'react';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook

export const action = async (formData, navigate) => {
  const data = Object.fromEntries(formData);
  const errors = { msg: '' };
  if (data.password.length < 3) {
    errors.msg = 'Password too short';
    return errors;
  }
  try {
    // Replace '/auth/login' with your admin login endpoint
    await customFetch.post('/admin/auth/login', data); // Assuming admin login endpoint
    toast.success('Login successful');
    navigate('/admin'); // Redirect to admin page upon successful login
  } catch (error) {
    errors.msg = error.response.data.msg;
    return errors;
  }
};

const AdminLogin = () => {
  const navigation = useNavigate();
  const isSubmitting = navigation.state === 'submitting';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await action(formData, navigation);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit} className='form'>
        <Logo />
        <h4>Admin Login</h4>
        <FormRow type='email' name='email' defaultValue='admin@example.com' /> {/* Default admin email */}
        <FormRow type='password' name='password' defaultValue='' /> {/* No default password for security */}
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
        <button type='button' className='btn btn-block'>
          Explore the app
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default AdminLogin;
