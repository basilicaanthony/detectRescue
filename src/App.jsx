import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  AdminLogin,
  Admin,
  Awareness,
  AllReadings,
  Dashboard,
  Error,
  Profile,
  FiremanInterface,
  HomeLayout,
  IOTinfo,
  Landing,
  Login,
  Register,
  Stats,
  TriggerPage,
} from './pages';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as loginActions } from './pages/AdminLogin';
import { loader as dashboardLoader } from './pages/Dashboard';
import { loader as allJobsLoader } from './pages/AllReadings';

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'dashboard',
        element: <Dashboard isDarkThemeEnabled={isDarkThemeEnabled} />,
        loader: dashboardLoader,
        children: [
          {
            path: 'stats',
            element: <Stats />,
          },
          {
            path: 'TriggerPage',
            element: <TriggerPage />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'AllReadings',
            element: <AllReadings />,
            loader: allJobsLoader,
          },
        ],
      },
      {
        path: 'awareness',
        element: <Awareness />,
      },
      {
        path: 'error',
        element: <Error />,
      },
      {
        path: 'fireman-interface',
        element: <FiremanInterface />,
      },
      {
        path: 'iot-info',
        element: <IOTinfo />,
      },
       {
        path: 'admin',
        element: <Admin />,
      },
      
      {
        path: 'adminlogin',
        element: <AdminLogin />,
        action: loginActions,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

