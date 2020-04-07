import React, { useEffect, useState } from 'react';

import Calendar from '../../../assets/img/calendar.svg';
import Catalogue from '../../../assets/img/catalogue.svg';
import Star from '../../../assets/img/star.svg';
import Tags from '../../../assets/img/tags.svg';
import Worldwide from '../.././../assets/img/worldwide.svg';
import IsEmpty from '../IsEmpty/IsEmpty';
import LazyImg from '../LazyImg/LazyImg';

import { MovieInfo } from '../../generated/graphql';

import './videoInfo.scss';

interface Props {
  data: MovieInfo;
}

const VideoInfo: React.FC<Props> = ({ data }) => {
  const [isFastConnection, setIsFastConnection] = useState(false);

  const onConnectionChange = () => {
    // @ts-ignore
    const { effectiveType } = navigator.connection;

    if (/\slow-2g|2g|3g/.test(effectiveType)) {
      setIsFastConnection(false);
    } else {
      setIsFastConnection(true);
    }
  };

  useEffect(() => {
    if ('connection' in navigator) {
      onConnectionChange();
    }
  }, []);

  return (
    <div className='video-info'>
      <IsEmpty val={data.poster}>
        <div className='content-poster'>
          <div className='video-poster'>
            <LazyImg src={data.poster} alt={data.name || ''} />
          </div>
        </div>
      </IsEmpty>
      {/* INFO */}
      <div className='content-text'>
        {/* HEADER TITLE */}
        <div className='video-page--title'>
          <div className='title-right'>
            {/*  RATE */}
            <IsEmpty val={data.imdb}>
              <div className='video-page--raite'>
                <div className='content-icon'>
                  <Star />
                </div>
                <span className='info-text'>{data.imdb} / 10</span>
              </div>
            </IsEmpty>
            {/*  Duration */}
            {/* <IsEmpty val={data.material_data.duration}>
              <div className='video-page--raite'>
                <div className='content-icon'>
                  <Time/>
                </div>
                <span className='info-text'>
                    {data.material_data.duration} мин.
                </span>
              </div>
            </IsEmpty> */}
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
                data.country.map((item: any) => {
                  return (
                    <li key={item} className='list-item'>
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
                {data?.genre?.map((item: any) => {
                  return (
                    <li key={item} className='list-item'>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          </IsEmpty>
        )}
        {/*  Producers*/}
        {/* <IsEmpty val={data.material_data.producers}>
          <div className='video-page--producers'>
            <div className='content-icon'>
              <Producers/>
            </div>
            <ul className='info-text list-items'>
              {data.material_data.producers && data.material_data.producers.map((item: any) => {
                return <li key={item} className='list-item'>{item}</li>;
              })}
            </ul>
          </div>
        </IsEmpty> */}
        {/*  Actors */}
        {/* <IsEmpty val={data.material_data.actors}>
          <div className='video-page--actors'>
            <div className='content-icon'>
              <Actors/>
            </div>
            <ul className='info-text list-items'>
              {data.material_data.actors && data.material_data.actors.map((item: any) => {
                return <li key={item} className='list-item'>{item}</li>;
              })}
            </ul>
          </div>
        </IsEmpty> */}

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
};

export default VideoInfo;
