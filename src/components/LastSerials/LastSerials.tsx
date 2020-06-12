import React, { memo, useEffect, useState } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { Link } from 'gatsby';

import Skeleton from '@material-ui/lab/Skeleton';
import Waiting from '../../assets/img/waiting.svg';
import { LastUpdateItems } from '../../shared/generated/graphql';
import { LIST_FOR_SERIALS_UPDATES } from '../../shared/ggl/getLastSerialsUpdates';

import useStyles from './styles';

const LastSerials = memo(() => {
  const classes = useStyles();
  const [ serials, setSerials ] = useState<Array<any>>([ 1, 2, 3, 4, 5, 6 ]);

  const { loading, error, data } = useQuery(LIST_FOR_SERIALS_UPDATES);

  useEffect(() => {
    if (data) {
      const serilas: LastUpdateItems[] = data.lastUpdate.items;
      /**
       * Get uniq Serials.Now Api return non uniq episodes.
       */
      const serialsSet = serilas && [ ...new Set(serilas.map((item: any) => item)) ];
      setSerials(serialsSet);
    }
  }, [ data ]);

  if (error) return <h2>{error.message}</h2>;

  return (
    <ul className={classes.lastSerials}>
      {serials.map((item: LastUpdateItems, index: number) => {
        return (
          <li className={classes.lastSerialsItems} key={index}>
            <Link
              to={`/video/?id=${item.id}`}
              aria-label='navigate to the video page'
              className={classes.serialsHref}
            >
              <div className={classes.episodesSerial}>
                {!loading ?
                  (<span className={classes.episodesTitle}>{item.name}</span>)
                  : (<Skeleton className={classes.skelet} variant='text'/>)
                }
                <div className={classes.episodesSerialContent}>
                  {!loading && item.season ?
                    (<span>{item.season} сезон </span>)
                    : (<Skeleton className={classes.skelet} variant='text'/>)}
                  {!loading && item.episode ?
                    (<span>{item.episode} серия</span>)
                    : (<Skeleton className={classes.skelet} variant='text'/>)}
                </div>
                {!item.iframe_url && <div className={classes.waiting} aria-label='waiting' title='ожидается'>
                  <Waiting/>
                </div>}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
});

export default LastSerials;
