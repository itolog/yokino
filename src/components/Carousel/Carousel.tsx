import { Link } from 'gatsby';
import React, { useCallback, useEffect, useState } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import LazyImg from '../../shared/components/LazyImg/LazyImg';
import { Short } from '../../shared/generated/graphql';
import Loader from '../../shared/UI/Loader/Loader';

import './carousel.scss';

import Error from '../../shared/components/Error/Error';
import { LIST_FOR_CAROUSEL } from '../../shared/ggl/getListForCarousel';

const Caurousel = React.memo(() => {

  const [ isMobile, setIsMobile ] = useState<boolean>(false);
  const { loading, data, error } = useQuery(LIST_FOR_CAROUSEL, {
    variables: {
      page: '1',
      year: '',
    },
  });

  const changeIsMobile = useCallback(() => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [ isMobile, setIsMobile ]);

  useEffect(() => {
    changeIsMobile();
    window.addEventListener('resize', changeIsMobile);
    return function cleanUp() {
      window.removeEventListener('resize', changeIsMobile);
    };
  }, []);

  if (error) {
    return <Error
      error={error.message}
    />;
  }

  if (loading)
    return (
      <div className='load-carousel'>
        <Loader/>
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
        centerSlidePercentage={isMobile ? 100 : 30}
        emulateTouch={true}
        showIndicators={false}
        interval={8000}
      >
        {data.listForCarousel.data.map((item: Short) => {
          return (
            <Link
              key={item.id || ''}
              to={`/video/?id=${item.kp_id}`}
              aria-label='navigate to the video page'
            >
              <div className='slide-items'>
                <LazyImg
                  src={item.poster}
                  height='270px'
                  width='100%'
                  alt={item.title || 'poster'}
                />
                <span className='slide-title'>{item.title}</span>
              </div>
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
});

export default Caurousel;
