import React from 'react';
import brand from '../assets/images/brand.svg';
import Navbar from '../components/common/Navbar';
import { useAuth } from '../auth/useAuth';

const HomePage: React.FC = () => {
  const { authState } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      <Navbar />
      {/* <div className="w-full border-b"></div> */}
      <div className="flex flex-grow flex-col items-center justify-center w-full">
        <h1 className="text-2xl font-semibold text-gray-700">
          {authState.user
            ? `Welcome, ${authState.user.username || ''}!`
            : 'Welcome!'}
        </h1>
        <div>
          <img src={brand} alt="OpenGlot brand" className="w-96" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
