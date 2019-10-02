import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import Layout from '../shared/components/Layout/Layout';
import LazyImg from '../shared/components/LazyImg/LazyImg';
import Player from '../shared/components/Player/Player';
import VideoInfo from '../shared/components/VideoInfo/VideoInfo';

import { GET_MOVIE } from '../shared/ggl/getMovie';

import '../shared/styles/videoPage.scss';
import Loader from '../shared/UI/Loader/Loader';

interface Props {
  location: Location;
}

const Video: React.FC<Props> = ({ location }) => {
  const id = location.search.split('=')[ 1 ];
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id },
  });

  if (loading) return <Loader/>;
  if (error) return <h2>{error.message}</h2>;

  const movie = data.getMovie;
  return (
    <>
      <Layout title={movie.title} description={movie.material_data.description}>
        <main className='movie-page'>
          <VideoInfo data={movie}/>
          <div className='video-media'>
            <div className='banner-200-300'>
              <a href='https://apyecom.com/click/5d94f4daa03594409d374554/151985/237033/subaccount' target='_blank'>
                <LazyImg
                  src='https://apycdn.com/cn/banner/15/61/98/15619840379717.png' width='200' height='300' alt='skillbox'
                /></a>
            </div>
            <Player src={movie.link}/>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Video;
