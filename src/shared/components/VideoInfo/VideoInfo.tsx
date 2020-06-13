import React, { memo } from 'react';

import Calendar from '../../../assets/img/calendar.svg';
import Catalogue from '../../../assets/img/catalogue.svg';
import Producers from '../../../assets/img/producer.svg';
import Star from '../../../assets/img/star.svg';
import Time from '../../../assets/img/stopclock.svg';
import Tags from '../../../assets/img/tags.svg';
import Actors from '../../../assets/img/theatre.svg';
import Worldwide from '../../../assets/img/worldwide.svg';
import IsEmpty from '../IsEmpty/IsEmpty';
import Trailer from './Trailer/Trailer';

import { MovieInfo } from '../../generated/graphql';

import useStyles from './styles';

interface Props {
  data: MovieInfo;
}

const VideoInfo: React.FC<Props> = memo(({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.videoInfo}>
      <IsEmpty val={data.poster}>
        <div className={classes.contentPoster}>
          <div className={classes.videoPoster}>
            {data.poster && (
              <img
                src={data.poster}
                width='280'
                height='360'
                loading='lazy'
                alt={data.name || ''}
              />
            )}
          </div>
          {/*  TRAILER  */}
          {data.trailers && data.trailers?.length !== 0 && (
            <IsEmpty val={data.trailers}>
              <Trailer trailers={data.trailers}/>
            </IsEmpty>
          )}
        </div>
      </IsEmpty>
      {/* INFO */}
      <div className={classes.contentText}>
        {/* HEADER TITLE */}
        <div className={classes.videoPageTitle}>
          <div className={classes.titleRight}>
            {/*  RATE */}

            <div className={classes.videoPageRaite}>
              <IsEmpty val={data.imdb}>
                <div className={classes.wrappRate}>
                  <span className={classes.infoText}>imdb: {data.imdb} </span>
                  <div className={classes.contentIcon}>
                    <Star/>
                  </div>
                </div>
              </IsEmpty>
              <IsEmpty val={data.kinopoisk}>
                <div className={classes.wrappRate}>
                  <span className={classes.infoText}>kp: {data.kinopoisk} </span>
                  <div className={classes.contentIcon}>
                    <Star/>
                  </div>
                </div>
              </IsEmpty>
            </div>

            {/*  Duration */}
            <IsEmpty val={data.time}>
              <div className={classes.videoPageRaite}>
                <div className={classes.contentIcon}>
                  <Time/>
                </div>
                <span className={classes.infoText}>{data.time?.split('/')[ 0 ]}</span>
              </div>
            </IsEmpty>
            {/* YEAR */}
            <IsEmpty val={data.year}>
              <div className={classes.videoPageYear}>
                <div className={classes.contentIcon}>
                  <Calendar/>
                </div>
                <span className={classes.infoText}>{data.year}</span>
              </div>
            </IsEmpty>
          </div>
          {/*  TITLE */}
          <div className={classes.titleLeft}>
            <IsEmpty val={data.name}>
              <h1 className={classes.videoTitle}>{data.name}</h1>
            </IsEmpty>
            <IsEmpty val={data.name_eng}>
              <h3 className={classes.videoSubtitle}>{data.name_eng}</h3>
            </IsEmpty>
          </div>
        </div>
        {/* HEADER TITLE  END*/}
        {/* COUNTRY */}
        <IsEmpty val={data.country}>
          <div className={classes.videoPageCountrie}>
            <div className={classes.contentIcon}>
              <Worldwide/>
            </div>
            <ul className={`${classes.infoText} ${classes.listItems}`}>
              {data.country &&
              data.country.map((item: any, index: number) => {
                return (
                  <li key={index} className={classes.listItem}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </IsEmpty>
        {/* GENRES */}
        {data?.genre?.length !== 0 && (
          <IsEmpty val={data.genre}>
            <div className={classes.videoPageGenres}>
              <div className={classes.contentIcon}>
                <Tags/>
              </div>
              <ul className={`${classes.infoText} ${classes.listItems}`}>
                {data?.genre?.map((item: any, index: number) => {
                  return (
                    <li key={index} className={classes.listItem}>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </IsEmpty>
        )}
        {/*  Producers*/}
        <IsEmpty val={data.director}>
          <div className={classes.videoPageProducers}>
            <div className={classes.contentIcon}>
              <Producers/>
            </div>
            <ul className={`${classes.infoText} ${classes.listItems}`}>
              {data.director &&
              data.director.map((item: any, index: number) => {
                return (
                  <li key={index} className={classes.listItem}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </IsEmpty>
        {/*  Actors */}
        <IsEmpty val={data.actors}>
          <div className={classes.videoPageActors}>
            <div className={classes.contentIcon}>
              <Actors/>
            </div>
            <ul className={`${classes.infoText} ${classes.listItems}`}>
              {data.actors &&
              data.actors.map((item: any, index: number) => {
                return (
                  <li key={index} className={classes.listItem}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </IsEmpty>

        {/*  Description */}
        <IsEmpty val={data.description}>
          <div className={classes.videoPageActors}>
            <div className={classes.contentIcon}>
              <Catalogue/>
            </div>
            <p className={`${classes.infoText} ${classes.listItems}`}>{data.description}</p>
          </div>
        </IsEmpty>
      </div>
    </div>
  );
});

export default VideoInfo;
