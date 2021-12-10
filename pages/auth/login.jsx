import { getSession, signIn, useSession } from 'next-auth/react';
import React from 'react';

const Login = () => {
  return (
    <div className='flex items-center flex-col justify-center w-full h-screen'>
      <div className='flex'>
        <h1>JovanSocial</h1>
        <h2>Connect with friends and the world around you on Jovan Social</h2>
      </div>
      <button
        className='flex items-center space-x-2 h-10 px-5 transition-colors duration-150 border rounded-lg focus:shadow-outline hover:bg-gray-50 hover:text-gray-800'
        onClick={() => signIn('google')}
      >
        <img src='/google.svg' alt='google Logo' className='h-4 ml-2' />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default Login;
