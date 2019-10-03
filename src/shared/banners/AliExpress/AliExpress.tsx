import React from 'react';

import LazyImg from '../../components/LazyImg/LazyImg';

import './aliExpress.scss';

const AliExpress = () => {
  return (
    <div className='aliExpress'>
      <a
        href='https://apyecom.com/click/5d94b119a03594492822bb74/75999/237033/subaccount'
        target='_blank'
        className='aliExpress--href'
      >
        <LazyImg
          src='https://apycdn.com/cn/banner/15/18/43/15184311949425.png'
          width='100%'
          height='100%'
          alt='aliexpress'
        />
      </a>
    </div>
  );
};

export default AliExpress;
