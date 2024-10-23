import React, { useContext } from 'react';
import { coverPic } from '../../public';
import NavBar from '../components/NavBar';
import { AuthContext } from '../helpers/AuthContext';
import { Alert, Snackbar } from '@mui/material';


function Home() {
  const { url, error, setError, errorMessage, setErrorMessage, errorType, setErrorType } = useContext(AuthContext);
  return (
    <div className='relative w-full min-h-screen'>
      {/* Background image div with brightness */}
      <div
        className='absolute top-0 left-0 w-full h-full brightness-50'
        style={{
          backgroundImage: `url(${coverPic})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>

      {/* Content over the background */}
      <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
        <p className='text-red-800 text-center font-extrabold text-3xl z-10 brightness-150'>
          <span className='text-yellow-600 border-2 border-yellow-600 px-5 py-2'>WELCOME</span>
          <br />
          <br />
          Employee Leave Management System
        </p>
      </div>
    </div>
  );
}

export default Home;
