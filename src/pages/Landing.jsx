import React from 'react'
import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.png'
import { Logo } from '../components';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
       <Logo/>
      </nav>
      <div className='container page'>
      <div className='info'>
        <h1>
          Fire <span>Detection</span> and <span> Rescue </span> app
        </h1>
        <p>
          Our fire detection and rescue aid system focuses on detecting fire at the earliest stage, also reducing rescue delays . 
Utilizing cameras, IoT devices, machine learning, and image processing, it aims to swiftly and accurately detect fire and provide headcount of victims trapped in fire . 
This promotes efficient rescues and reduced losses. 
.The system will automatically trigger immediate alerts to emergency services preventing fire escalation and averting major disasters. 

        </p>
        <Link to ='/register' className='btn register-link'>
          Register
        </Link>
        <Link to ='/login' className='btn register-link'>
          Login
        </Link>

        <Link to ='/Awareness' className='btn register-link'>
          Awareness
        </Link>
        <Link to ='/IOTinfo' className='btn register-link'>
          IOT information
        </Link>
         <Link to ='/AdminLogin' className='btn register-link'>
          Admin
        </Link>
        
      </div>
        <img src = {main} alt='job hunt' className='img main-img' />
      </div>

    </Wrapper>
  );
};

export default Landing