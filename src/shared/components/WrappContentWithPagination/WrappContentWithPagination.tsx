import React from 'react';

import CinemaPagination from '../../components/CinemaPagination/CinemaPagination';
import Error from '../../components/Error/Error';
import Layout from '../../components/Layout/Layout';
import MovieCard from '../../components/MovieCard/MovieCard';
import SkeletonLoader from '../../components/SkeletonLoader/SkeletonLoader';

import { Movies, Serials } from '../../generated/graphql';

interface Props {
  error: string | undefined;
  mediaData: Movies | Serials;
  loading: boolean;
  toNextPage: (url: string) => void;
}

const WrappContentWithPagination: React.FC<Props> = ({
  error,
  mediaData,
  toNextPage,
  loading,
}) => {
  const handleNextPage = () => {
    toNextPage(mediaData.next_page);
  };

  const handlePrevPage = () => {
    toNextPage(mediaData.prev_page);
  };

  if (error) return <Error error={error} />;

  const results: any = mediaData && mediaData.results;

  return (
    <>
      <Layout title='Serials' description='cinema online serials'>
        <main className='home'>
          <CinemaPagination
            prevLink={mediaData.prev_page}
            nextLink={mediaData.next_page}
            prev={handlePrevPage}
            next={handleNextPage}
          >
            {loading && <SkeletonLoader />}
            {!loading &&
              results.map((item: any) => {
                return (
                  <MovieCard
                    key={item.kinopoisk_id}
                    title={item.title}
                    poster={item.material_data.poster_url}
                    material_data={item.material_data}
                    imdb_rating={item.material_data.imdb_rating}
                    kinopoisk_id={item.kinopoisk_id}
                    quality={item.quality}
                    kinopoisk_rating={item.material_data.kinopoisk_rating}
                    last_episode={item.last_episode}
                    last_season={item.last_season}
                  />
                );
              })}
          </CinemaPagination>
        </main>
      </Layout>
    </>
  );
};

export default WrappContentWithPagination;
