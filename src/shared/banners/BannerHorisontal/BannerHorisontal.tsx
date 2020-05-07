import { makeStyles } from '@material-ui/core/styles';
import React, { memo } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import LazyImg from '../../components/LazyImg/LazyImg';
import { dataBunner } from './data';

import { IBanner } from '../type';

const useStyles = makeStyles((theme) => ({
  aliExpress: {
    width: '720px',
    margin: '3% 0',
    [ theme.breakpoints.down(730) ]: {
      width: '90%',
    },
    [ theme.breakpoints.down(480) ]: {
      display: 'none',
    },
  },
}));


const BannerHorisontal = memo(() => {
  const classes = useStyles();
  return (
    <div className={classes.aliExpress}>
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        swipeable={true}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        interval={12000}
      >
        {dataBunner.map((item: IBanner) => {
          return (
            <a href={item.href} key={item.id} target='_blank' rel='noopener'>
              <LazyImg src={item.img} width='728' height='90' alt='banners'/>
            </a>
          );
        })}
      </Carousel>
    </div>
  );
});

export default BannerHorisontal;
