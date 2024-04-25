import React, { createContext, useContext, useEffect, useState } from 'react';
import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

// Import images
import image1 from './images/fire1.jpg';
import image2 from './images/fire2.webp';

// Custom Context Declaration
const UserContext = createContext();

// Custom Context Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await customFetch.get('/users'); // Fetch user data from the server
        setUser(userData); // Set user data in the state
      } catch (error) {
        console.error(error);
        toast.error('Error fetching user data');
      }
    };

    fetchUser(); // Call the fetchUser function
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// Custom Hook to consume the User Context
export const useUserContext = () => useContext(UserContext);

// Default placeholder user data
const defaultUser = {
  _id: '6601893dbd86ed86406963d4',
  name: 'Akshaya',
  password: '$2a$10$DFUJaCUg1USv8u87dtQV7egPms1TkLM608DYwVKFHa.b6GIUSTJ9K',
  email: 'jlb@gmail.com',
  lastName: 'Jolie',
  flatNo: '8B-4',
  building:'our earth',
  city: 'Mumbai',
  pincode: 400022,
  ageGroup: 'Age-Teenager',
  thermal: "114", // Include thermal field
  smoke: "mq2:81,mq7:14", // Include smoke field
  count: "1", // Include count field
  __v: 0
};

// Refactored Admin Component to use User Context
const Admin = () => {
  const user = useUserContext() || defaultUser; // Consume user data from the User Context or use default placeholder

  // Destructure user data
  const { _id, name, lastName, flatNo, building, city, pincode, email, ageGroup, thermal, smoke, count } = user;

  return (
    <Wrapper>
      <form method='post' className='form' encType='multipart/form-data'>
        <h4 className='form-title'>Fire Department </h4>
        <div className='form-center'>
          {/* Render user data */}
          <p>_id: {_id}</p>
          <p>Name: {name}</p>
          <p>Last Name: {lastName}</p>
          <p>Flat No: {flatNo}</p>
          <p>Building: {building}</p>
          <p>City: {city}</p>
          <p>Pincode: {pincode}</p>
          <p>Email: {email}</p>
          <p>Age Group: {ageGroup}</p>
          <p>Thermal: {thermal}</p> {/* Display thermal field */}
          <p>Smoke: {smoke}</p> {/* Display smoke field */}
          <p>Count: {count}</p> {/* Display count field */}

          {/* Display images */}
          <img src={image1} alt='Image 1' />
          
        </div>
      </form>
    </Wrapper>
  );
};

export default Admin;
