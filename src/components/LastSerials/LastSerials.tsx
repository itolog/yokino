import { makeStyles } from '@material-ui/core/styles';
import React, { memo, useEffect, useState } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { Link } from 'gatsby';

import Skeleton from '@material-ui/lab/Skeleton';
import Waiting from '../../assets/img/waiting.svg';
import { LastUpdateItems } from '../../shared/generated/graphql';
import { LIST_FOR_SERIALS_UPDATES } from '../../shared/ggl/getLastSerialsUpdates';

const useStyles = makeStyles((theme) => ({
  '.carousel .slide': {
    background: 'none',
  },
  lastSerials: {
    display: 'flex',
    flexFlow: 'column',
    width: '90%',
    [ theme.breakpoints.down('sm') ]: {
      flexFlow: 'row',
      overflowX: 'auto',
      overflowY: 'hidden',
      width: '250px',
      minHeight: '200px',
      marginBottom: '5%',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  },
  lastSerialsItems: {
    position: 'relative',
    textAlign: 'center',
    margin: '1px',
    borderRadius: '5px',
    boxShadow: '0px 0px 8px 2px rgb(26, 2, 26)',
    perspective: '1410px',
    perspectiveOrigin: '45% 50%',
    transition: ' 0.5s',
    backgroundImage: `linear-gradient(
      to right,
      #1a143b,
      #24143d,
      #2e133f,
      #381240,
      #421040,
      #421040,
      #421040,
      #421040,
      #381240,
      #2e133f,
      #24143d,
      #1a143b
    )`,
    '&:hover': {
      boxShadow: '0px 0px 12px 5px rgba(0, 0, 0, 1)',
      transform: 'scale(1.1) scaleZ(1) rotateZ(0deg)',
      zIndex: '20',
    },
    [ theme.breakpoints.down('sm') ]: {
      transform: 'scale(1.1) scaleZ(1) rotateZ(0deg)',
      margin: '0 5%',
    },
  },
  episodesTitle: {
    fontSize: '1em',
  },
  episodesSerial: {
    position: 'relative',
    color: 'rgb(206, 232, 241)',
    fontWeight: 'bold',
    height: '100%',
    top: '0',
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    justifyContent: 'space-around',
    zIndex: '2',
    [ theme.breakpoints.down('sm') ]: {
      minWidth: '200px',
      width: 'auto',
    },
  },

  episodesSerialContent: {
    display: 'flex',
    flexFlow: 'wrap column',
  },
  serialsHref: {
    height: '100%',
  },
  waiting: {
    position: ' absolute',
    bottom: '0',
    width: '20px',
    height: '20px',
    [ theme.breakpoints.down('sm') ]: {
      bottom: '10px',
    },
  },
  skelet: {
    background: '#490e50',
  },
}));


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
                  {!loading ?
                    (<span>{item.season} сезон </span>)
                    : (<Skeleton className={classes.skelet} variant='text'/>)}
                  {!loading ?
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
