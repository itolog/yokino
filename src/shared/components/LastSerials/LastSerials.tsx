import { useQuery } from '@apollo/react-hooks';
import { Link } from 'gatsby';
import React from 'react';

import { LIST_FOR_SERIALS_UPDATES } from '../../ggl/getLastSerialsUpdates';
import LazyImg from '../LazyImg/LazyImg';
import './lastSerials.scss';

const LastSerials = () => {
  const { loading, error, data } = useQuery(LIST_FOR_SERIALS_UPDATES);
  const serilas = data && data.listForSerialsUpdate;
  return (
    <ul className='last-serials'>
      {!loading && serilas.map((item: any) => {
        return (
          <li className='last-serials--items' key={item.kinopoisk_id}>
            <Link
              to={`/video/?id=${item.kinopoisk_id}`}
              aria-label='navigate to the video page'
            >
              <LazyImg
                src={item.material_data.poster_url}
                alt={item.title}
                height='140'
                width='120'
              />
              <div className='episodes-serial'>
                <span>{item.title}</span>
                <div>
                  <span>{item.last_season} сезон </span>
                  <span>{item.last_episode} серия</span>
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