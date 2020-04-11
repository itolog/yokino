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
import LazyImg from '../LazyImg/LazyImg';
import Trailer from './Trailer/Trailer';

import { MovieInfo } from '../../generated/graphql';

import './videoInfo.scss';

interface Props {
  data: MovieInfo;
}

const VideoInfo: React.FC<Props> = memo(({ data }) => {
  return (
    <div className='video-info'>
      <IsEmpty val={data.poster}>
        <div className='content-poster'>
          <div className='video-poster'>
            <LazyImg
              src={data.poster}
              width='290'
              height='360'
              alt={data.name || ''}
            />
          </div>
          {/*  TRAILER  */}
          {data.trailers && data.trailers?.length !== 0 && (
            <IsEmpty val={data.trailers}>
              <Trailer trailers={data.trailers} />
            </IsEmpty>
          )}
        </div>
      </IsEmpty>
      {/* INFO */}
      <div className='content-text'>
        {/* HEADER TITLE */}
        <div className='video-page--title'>
          <div className='title-right'>
            {/*  RATE */}

            <div className='video-page--raite'>
              <IsEmpty val={data.imdb}>
                <div className='wrapp-rate'>
                  <span className='info-text'>imdb: {data.imdb} </span>
                  <div className='content-icon'>
                    <Star />
                  </div>
                </div>
              </IsEmpty>
              <IsEmpty val={data.kinopoisk}>
                <div className='wrapp-rate'>
                  <span className='info-text'>kp: {data.kinopoisk} </span>
                  <div className='content-icon'>
                    <Star />
                  </div>
                </div>
              </IsEmpty>
            </div>

            {/*  Duration */}
            <IsEmpty val={data.time}>
              <div className='video-page--raite'>
                <div className='content-icon'>
                  <Time />
                </div>
                <span className='info-text'>{data.time?.split('/')[0]}</span>
              </div>
            </IsEmpty>
            {/* YEAR */}
            <IsEmpty val={data.year}>
              <div className='video-page--year'>
                <div className='content-icon'>
                  <Calendar />
                </div>
                <span className='info-text'>{data.year}</span>
              </div>
            </IsEmpty>
          </div>
          {/*  TITLE */}
          <div className='title-left'>
            <IsEmpty val={data.name}>
              <h1 className='video-title'>{data.name}</h1>
            </IsEmpty>
            <IsEmpty val={data.name_eng}>
              <h3 className='video-subtitle'>{data.name_eng}</h3>
            </IsEmpty>
          </div>
        </div>
        {/* HEADER TITLE  END*/}
        {/* COUNTRY */}
        <IsEmpty val={data.country}>
          <div className='video-page--countrie'>
            <div className='content-icon'>
              <Worldwide />
            </div>
            <ul className='info-text list-items'>
              {data.country &&
                data.country.map((item: any, index: number) => {
                  return (
                    <li key={index} className='list-item'>
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
            <div className='video-page--genres'>
              <div className='content-icon'>
                <Tags />
              </div>
              <ul className='info-text list-items'>
                {data?.genre?.map((item: any, index: number) => {
                  return (
                    <li key={index} className='list-item'>
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
          <div className='video-page--producers'>
            <div className='content-icon'>
              <Producers />
            </div>
            <ul className='info-text list-items'>
              {data.director &&
                data.director.map((item: any, index: number) => {
                  return (
                    <li key={index} className='list-item'>
                      {item}
                    </li>
                  );
                })}
            </ul>
          </div>
        </IsEmpty>
        {/*  Actors */}
        <IsEmpty val={data.actors}>
          <div className='video-page--actors'>
            <div className='content-icon'>
              <Actors />
            </div>
            <ul className='info-text list-items'>
              {data.actors &&
                data.actors.map((item: any, index: number) => {
                  return (
                    <li key={index} className='list-item'>
                      {item}
                    </li>
                  );
                })}
            </ul>
          </div>
        </IsEmpty>

        {/*  Description */}
        <IsEmpty val={data.description}>
          <div className='video-page--actors'>
            <div className='content-icon'>
              <Catalogue />
            </div>
            <p className='info-text list-items'>{data.description}</p>
          </div>
        </IsEmpty>
      </div>
    </div>
  );
});

export default VideoInfo;
