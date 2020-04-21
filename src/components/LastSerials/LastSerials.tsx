import { useQuery } from '@apollo/react-hooks';
import { Link } from 'gatsby';
import React, { memo } from 'react';

import { LastUpdateItems } from '../../shared/generated/graphql';
import { LIST_FOR_SERIALS_UPDATES } from '../../shared/ggl/getLastSerialsUpdates';
import SpinLoader from '../../shared/UI/SpinLoader/SpinLoader';
// import LazyImg from '../LazyImg/LazyImg';
import './lastSerials.scss';

const LastSerials = memo(() => {
  const { loading, error, data } = useQuery(LIST_FOR_SERIALS_UPDATES);
  const serilas: LastUpdateItems[] = data && data.lastUpdate.items;

  /**
   * Get uniq Serials.Now Api return non uniq episodes.
   */
  const serialsSet = serilas && [...new Set(serilas.map((item: any) => item))];

  if (error) return <h2>{error.message}</h2>;

  if (loading)
    return (
      <div className='update-spiner'>
        <SpinLoader />
      </div>
    );

  return (
    <ul className='last-serials'>
      {!loading &&
        serialsSet.map((item: LastUpdateItems, index: number) => {
          return (
            <li className='last-serials--items' key={index}>
              <Link
                to={`/video/?id=${item.id}`}
                aria-label='navigate to the video page'
                className='serials-href'>
                {/* <LazyImg
                src={item.material_data.poster_url}
                alt={item.title}
                height='140'
                width='120'
              /> */}
                <div className='episodes-serial'>
                  <span className='episodes-title'>{item.name}</span>
                  <div>
                    <span>{item.season} сезон </span>
                    <span>{item.episode} серия</span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
    </ul>
  );
});

export default LastSerials;
