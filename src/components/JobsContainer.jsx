import React from 'react';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAllReadingsContext } from '../pages/AllReadings';

const JobsContainer = () => {
  const  data  = useAllReadingsContext();

  // Check if data or readings array is undefined or empty
  if (!data ||  !data.readings || data.readings.length === 0) {
    return (
      <Wrapper>
        <h2>No readings to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className='jobs'>
        {data.readings.map((reading) => (
          <Job key={reading._id} {...reading} />
        ))}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
