import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/react-hooks';

import { NowPlaying } from '../../generated/graphql';
import { NOW_PLAYING } from '../../ggl/nowPlaying';
import { SIZE } from '../../interface/size';
import getBackDropUrl from '../../utils/getBackDropUrl';
import LazyImg from '../LazyImg/LazyImg';

import './mainBgImage.scss';

const MainBgImage = () => {
  const [ url, setUrl ] = useState('');

  const { loading, error, data } = useQuery(NOW_PLAYING);

  const movie: NowPlaying[] = data && data.nowPlaying;

  useEffect(() => {
    if (!loading && movie) {
      const random = Math.floor(Math.random() * 20);
      const path = (movie[ random ].backdrop_path) as string;
      setUrl(getBackDropUrl(path, SIZE.MEDIUM));
    }
  }, [ movie, loading ]);

  if (error) return null;

  return (
    <>
      {url ? (<div className='mainbg'>
          <LazyImg
            styleImage={{ objectFit: 'cover' }}
            src={url}
            alt='backdrop image'
          />
        </div>)
        : null
      }
    </>
  );
};

export default MainBgImage;