import React from 'react';

import Carousel from 'react-multi-carousel';
import LazyImg from '../../components/LazyImg/LazyImg';

import './bannersCarousel.scss';

const BannersCarousel = () => {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    tabletMini: {
      breakpoint: { max: 800, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className='wrapp-carousel banner-carousel'>
      <Carousel
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={8000}
        customTransition='all 0.8s'
        transitionDuration={500}
        removeArrowOnDeviceType={[ 'tablet', 'mobile' ]}
        containerClass='carousel-container'
        responsive={responsive}
      >
        {/*web*/}
        <div className='banner-200-300'>
          <a href='https://apyecom.com/click/5d94f4daa03594409d374554/151985/237033/subaccount' target='_blank'>
            <LazyImg
              src='https://apycdn.com/cn/banner/15/61/98/15619840379717.png' width='200' height='300' alt='web'
            /></a>
        </div>
        {/*c#*/}
        <div className='banner-200-300'>
          <a href='https://apyecom.com/click/5d94f4daa03594409d374554/151985/237033/subaccount' target='_blank'>
            <LazyImg src='https://apycdn.com/cn/banner/15/61/98/15619839952729.png' width='200' height='300' alt='c#'/></a>
        </div>
        {/*javascript*/}
        <div className='banner-200-300'>
          <a href='https://apyecom.com/click/5d94b119a03594492822bb74/75999/237033/subaccount' target='_blank'>
            <LazyImg src='https://apycdn.com/cn/banner/15/22/15/15221571902593.png' width='200' height='300' alt='javascript'/></a>
        </div>
        {/* java */}
        <div className='banner-200-300'>
          <a href='https://apyecom.com/click/5d94f4daa03594409d374554/151985/237033/subaccount' target='_blank'>
            <LazyImg
              src='https://apycdn.com/cn/banner/15/61/98/15619840236768.png' width='200' height='300' alt='java'
            /></a>
        </div>
        {/* designe  */}
        <div className='banner-200-300'>
          <a href='https://apyecom.com/click/5d94f4daa03594409d374554/151985/237033/subaccount' target='_blank'>
            <LazyImg
              src='https://apycdn.com/cn/banner/15/61/98/1561984053716.png' width='200' height='300' alt='designe'
            /></a>
        </div>
        {/* marketing */}
        <div className='banner-200-300'>
          <a href='https://apyecom.com/click/5d94f4daa03594409d374554/151985/237033/subaccount' target='_blank'>
            <LazyImg
              src='https://apycdn.com/cn/banner/15/61/98/15619839299684.png' width='200' height='300' alt='marketing'
            /></a>
        </div>
        {/* blockchain */}
        <div className='banner-200-300'>
          <a href='https://apyecom.com/click/5d94f4daa03594409d374554/151985/237033/subaccount' target='_blank'>
            <LazyImg
              src='https://apycdn.com/cn/banner/15/61/98/15619838991602.png' width='200' height='300' alt='blockchain'
            /></a>
        </div>
        {/* kiwi */}
        <div className='banner-200-300'>
          <a href='https://apyecom.com/click/5d9615f3a035940e9620e9b8/126480/237033/subaccount' target='_blank'>
            <LazyImg
              src='https://apycdn.com/cn/banner/14/89/48/14894815461642.jpg' width='200' height='300' alt='blockchain'
            /></a>
        </div>
      </Carousel>
    </div>
  );
};

export default BannersCarousel;