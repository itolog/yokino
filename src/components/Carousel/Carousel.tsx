import { Link } from 'gatsby';
import React  from 'react';

import { useQuery } from '@apollo/react-hooks';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import LazyImg from '../../shared/components/LazyImg/LazyImg';
import Loader from '../../shared/components/Loader/Loader';

import './carousel.scss';

import { LIST_FOR_CAROUSEL } from '../../shared/ggl/getListForCarousel';

const Caurousel = () => {
  const { loading, data } = useQuery(LIST_FOR_CAROUSEL);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    tabletMini: {
      breakpoint: { max: 800, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
 
  if (loading)
    return (
      <div className='load-carousel'>
        <Loader />
      </div>
    );

  return (
    <div className='wrapp-carousel'>
      <Carousel
        ssr={true}
        customTransition='all 0.8s'
        transitionDuration={500}
        containerClass='carousel-container'
        responsive={responsive}
      >
        {data.listForCarousel.map((item: any) => {
          return (
            <Link
              key={item.kinopoisk_id}
              to={`/video/?id=${item.kinopoisk_id}`}
              aria-label='navigate to the video page'
            >
              <div className='slide-items'>
                <LazyImg
                  src={item.material_data.poster_url}
                  height='270px'
                  width='100%'
                  alt={item.title}
                />
                <span className='slide-title'>{item.title}</span>
              </div>
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Caurousel;
