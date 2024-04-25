import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const Job = ({
  _id,
  temperature,
  smokeDetect,
  thermalDetect,
  createdAt,
  updatedAt,
}) => {
  const formattedCreatedAt = day(createdAt).format('MMM Do, YYYY');
  const formattedUpdatedAt = day(updatedAt).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <div className='content'>
        <div className='content-center'>
          <JobInfo icon="id" text={_id} />
          <JobInfo icon="Temp" text={temperature} />
          <JobInfo icon="Smoke" text={smokeDetect} />
          <JobInfo icon="Thermal" text={thermalDetect} />
          <JobInfo icon="Date" text={formattedCreatedAt} />
          <JobInfo icon={<FaCalendarAlt />} text={formattedUpdatedAt} />
        </div>
        
      </div>
    </Wrapper>
  );
};

export default Job;
