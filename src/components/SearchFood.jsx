import React from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const SearchFood = () => {
  // const navigate = useNavigate();
  // const location = useLocation();

  // const handleClick = () => {
  //   navigate('demo'); // This navigates to '/searchfood/demo'
  // };

  return (
    <div className='absolute top-24'>
      {/* <div 
        onClick={handleClick} 
        className={`absolute top-40 ${location.pathname === '/searchfood/demo' ? 'hidden' : ''}`}>
        Click to go to Demo
      </div>
      <Outlet /> This will render the nested route */}
SearchFood

    </div>
  );
};

export default SearchFood;
