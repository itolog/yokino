import { useQuery } from '@apollo/react-hooks';
import { Link } from 'gatsby';
import React from 'react';

import { LastUpdateItems } from '../../generated/graphql';
import { LIST_FOR_SERIALS_UPDATES } from '../../ggl/getLastSerialsUpdates';
import LazyImg from '../LazyImg/LazyImg';
import './lastSerials.scss';

const LastSerials = () => {
  const { loading, error, data } = useQuery(LIST_FOR_SERIALS_UPDATES);
  const serilas: LastUpdateItems[] = data && data.lastUpdate.items;

  if (error) return <h2>{error.message}</h2>;

  return (
    <ul className='last-serials'>
      {!loading &&
        serilas.map((item: LastUpdateItems, index: number) => {
          return (
            <li className='last-serials--items' key={item.id || index}>
              <Link
                to={`/video/?id=${item.id}`}
                aria-label='navigate to the video page'>
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
};

export default LastSerials;
