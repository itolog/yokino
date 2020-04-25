/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby';
import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import LazyImg from '../../shared/components/LazyImg/LazyImg';
import { Movie } from '../../shared/generated/graphql';
import useScreenWidth from '../../shared/hooks/useScreenWidth';
import { ScreenType } from '../../shared/interface/screen-type';

import Skeleton from '@material-ui/lab/Skeleton';

import Error from '../../shared/components/Error/Error';
import { LIST_FOR_CAROUSEL } from '../../shared/ggl/getListForCarousel';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '.carousel .slide': {
      background: 'none',
    },
  },
  wrappCarousel: {
    position: 'relative',
    zIndex: 4,
    marginBottom: '5%',
    boxShadow: '0px 3px 5px -1px rgba(235, 193, 235, 1)',
    width: '600px',
    [ theme.breakpoints.down(769) ]: {
      width: '200px',
      marginBottom: '10%',
    },
  },
  slideStems: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
  },
  card: {
    background: '#392448',
    border: '1px solid grey',
    [ theme.breakpoints.down(769) ]: {
      border: 'none',
    },
  },
}));

const Caurousel = React.memo(() => {
  const classes = useStyles();
  const screenType = useScreenWidth();
  const [ movie, setMovie ] = useState<Array<any>>([ 1, 2, 3 ]);

  const { loading, data, error } = useQuery(LIST_FOR_CAROUSEL);

  useEffect(() => {
    if (data) {
      setMovie(data.listForCarousel.results);
    }
  }, [ data ]);

  if (error) {
    return <Error error={error.message}/>;
  }


  return (
    <div className={classes.wrappCarousel}>
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
        interval={8000}
      >
        {movie.map((item: Movie, index: number) => {
          return (
            <Link
              key={item.id || index}
              to={`/video/?id=${item.id}`}
              aria-label='navigate to the video page'
            >
              <div className={classes.slideStems}>
                {!loading && item.poster ? (<LazyImg
                  src={item.poster}
                  height='270px'
                  width='100%'
                  alt={item.name || 'poster'}
                />) : (<Skeleton className={classes.card} animation='pulse' variant='rect' width='100%' height={270}/>)}
              </div>
            </Link>
          );
        })}
      </Carousel>
    </div>
  );
});

export default Caurousel;
