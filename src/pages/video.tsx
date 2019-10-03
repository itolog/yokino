import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import BannersCarousel from '../shared/banners/BannersCarousel/BannersCarousel'
import Layout from '../shared/components/Layout/Layout';
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

            <BannersCarousel />

            <Player src={movie.link} id={movie.kinopoisk_id}/>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Video;
