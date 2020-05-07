import React from 'react';
import './loader.scss';

const Loader = () => {
  return (
    <div className='loader'>
      <div className='yellow loader-item' />
      <div className='red loader-item' />
      <div className='blue loader-item' />
      <div className='violet loader-item' />
    </div>
  );
};

export default Loader;
