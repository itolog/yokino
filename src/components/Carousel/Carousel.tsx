/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import { Link } from 'gatsby';
import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import LazyImg from '../../shared/components/LazyImg/LazyImg';
import { Movie } from '../../shared/generated/graphql';
import useScreenWidth from '../../shared/hooks/useScreenWidth';
import { ScreenType } from '../../shared/interface/screen-type';
import Loader from '../../shared/UI/Loader/Loader';

import './carousel.scss';

import Error from '../../shared/components/Error/Error';
import { LIST_FOR_CAROUSEL } from '../../shared/ggl/getListForCarousel';

const Caurousel = React.memo(() => {
  const screenType = useScreenWidth();

  const { loading, data, error } = useQuery(LIST_FOR_CAROUSEL);

  if (error) {
    return <Error error={error.message} />;
  }

  if (loading)
    return (
      <div className='load-carousel'>
        <Loader />
      </div>
    );

  return (
    <div className='wrapp-carousel'>
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        swipeable={true}
        showThumbs={false}
        showStatus={false}
        centerMode={true}
        centerSlidePercentage={
          screenType === ScreenType.TABLETS || screenType === ScreenType.MOBILE
            ? 100
            : 30
        }
        emulateTouch={true}
        showIndicators={false}
        interval={8000}>
        {data.listForCarousel.results.map((item: Movie, index: number) => {
          return (
            <Link
              key={item.id || index}
              to={`/video/?id=${item.id}`}
              aria-label='navigate to the video page'>
              <div className='slide-items'>
                <LazyImg
                  src={item.poster}
                  height='270px'
                  width='100%'
                  alt={item.name || 'poster'}
                />
                {/* <span className='slide-title'>{item.name}</span> */}
              </div>
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
});

export default Caurousel;
