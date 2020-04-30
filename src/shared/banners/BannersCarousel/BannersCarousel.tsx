import { makeStyles } from '@material-ui/core/styles';
import React, { memo } from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { IBanner } from '../type';

import { dataCarousel } from './data_banner';

const useStyles = makeStyles(() => ({
  bannerCarousel: {
    width: '200px',
    height: '300px',
  },
  bannerHref: {
    color: 'azure',
  },
}));


const BannersCarousel = memo(() => {
  const classes = useStyles();

  return (
    <div className={classes.bannerCarousel}>
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        swipeable={true}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        interval={8000}
      >
        {dataCarousel.map((item: IBanner) => {
          return (
            <div key={item.id}>
              <img src={item.img} width='200' height='280' alt='banners'/>
              <p className='legend'>
                <a
                  href={item.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={classes.bannerHref}
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
});

export default BannersCarousel;
