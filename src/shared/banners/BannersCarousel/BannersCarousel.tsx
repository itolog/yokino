import React from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import './bannersCarousel.scss';

import { dataCarousel } from './data_banner';

const BannersCarousel = () => {
  return (
    <div className='banner-carousel'>
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        swipeable={true}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        interval={8000}
      >
        {dataCarousel.map((item: any, index: number) => {
          return (
            <div key={index}>
              <img src={item.img} width='200' height='280' alt='banners'/>
              <p className='legend'>
                <a
                  href={item.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='banner_href'
                >
                  перейти
                </a>
              </p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default BannersCarousel;
