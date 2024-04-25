import React, { createContext, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { JobsContainer, SearchContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';



export const loader = async () => {
  try {
    const { data } = await customFetch.get('/reading');
    console.log('Data fetched from MongoDB:', data); // Log fetched data
    return { data };
  } catch (error) {
    console.error(error);
    toast.error(error?.response?.data?.msg || 'Error fetching readings data');
    throw error; // Re-throwing the error to handle it elsewhere if needed
  }
};

// Context Declaration
const AllReadingsContext = createContext();

const AllReadings = () => {
  const { data } = useLoaderData();

  useEffect(() => {
    console.log('Data available in AllReadings component:', data); // Log data available in component
  }, [data]);

  return (
    <AllReadingsContext.Provider value={data}>
      <>
        <JobsContainer />
      </>
    </AllReadingsContext.Provider>
  );
};

export const useAllReadingsContext = () => useContext(AllReadingsContext);

export default AllReadings;

