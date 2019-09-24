import React from 'react';

import { useQuery } from '@apollo/react-hooks';
import Layout from '../shared/components/Layout/Layout';
import Loader from '../shared/components/Loader/Loader';
import Player from '../shared/components/Player/Player';
import VideoInfo from '../shared/components/VideoInfo/VideoInfo';
import { GET_MOVIE } from '../shared/ggl/getMovie';

import '../shared/styles/videoPage.scss';

interface Props {
  location: Location;
}

const Video: React.FC<Props> = ({ location }) => {
  const id = location.search.split('=')[1];
  const { loading, error, data } = useQuery(GET_MOVIE, {
    variables: { id },
  });

  if (loading) return <Loader />;
  if (error) return <h2>{error.message}</h2>;

  const movie = data.getMovie;
  return (
    <>
      <Layout title={movie.title} description={movie.material_data.description}>
        <main className='movie-page'>
          <VideoInfo data={movie} />
          <div className='video-media'>
            <Player src={movie.link} />
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Video;
