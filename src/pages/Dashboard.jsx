import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import { createContext, useState, useContext } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Navbar, BigSidebar, SmallSidebar } from '../components';
import Wrapper from '../assets/wrappers/Dashboard';
import customFetch from '../utils/customFetch';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Profile from './Profile'; // Import Profile component

export const loader = async () => {
  try {
    const { data } = await customFetch('/users/current-user');
    return data;
  } catch (error) {
    console.log(error);
    throw error;
    return redirect('/');
  }
};

const DashboardContext = createContext();

const Dashboard = () => {
  const outletContext = useOutletContext();

  const user = outletContext && outletContext.user ? outletContext.user : {};

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const navigate = useNavigate();

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              {/* Define nested routes using <Outlet> */}
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default Dashboard;

// Wrap Dashboard component with Router
export const DashboardWithRouter = () => (
  <Router>
    <Dashboard />
  </Router>
);
