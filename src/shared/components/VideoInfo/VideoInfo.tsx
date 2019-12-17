import React, { useEffect, useState } from 'react';

import Calendar from '../../../assets/img/calendar.svg';
import Catalogue from '../../../assets/img/catalogue.svg';
// import Producers from '../../../assets/img/producer.svg';
import Star from '../../../assets/img/star.svg';
import Time from '../../../assets/img/stopclock.svg';
import Tags from '../../../assets/img/tags.svg';
// import Actors from '../../../assets/img/theatre.svg';
import Worldwide from '../.././../assets/img/worldwide.svg';
import IsEmpty from '../IsEmpty/IsEmpty';
import LazyImg from '../LazyImg/LazyImg';

import { GetMovie } from '../../generated/graphql';

import './videoInfo.scss';

interface Props {
  data: GetMovie;
  poster?: string;
}

const VideoInfo: React.FC<Props> = ({ data, poster }) => {
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
      <IsEmpty val={data.media_info?.poster_url}>
        <div className='content-poster'>
          <div className='video-poster'>
            <LazyImg
              src={
                data.media_info?.poster_url
                  ? `https://image.tmdb.org/t/p/${
                      isFastConnection ? 'original' : 'w500'
                    }/${data.media_info?.poster_url}`
                  : poster
              }
              alt={data.title || ''}
            />
          </div>
        </div>
      </IsEmpty>
      {/* INFO */}
      <div className='content-text'>
        {/* HEADER TITLE */}
        <div className='video-page--title'>
          <div className='title-right'>
            {/*  RATE */}
            <IsEmpty val={data.media_info && data.media_info.rating}>
              <div className='video-page--raite'>
                <div className='content-icon'>
                  <Star />
                </div>
                <span className='info-text'>
                  {data.media_info?.rating} / 10
                </span>
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
            <IsEmpty val={data.title}>
              <h1 className='video-title'>{data.title}</h1>
            </IsEmpty>
            <IsEmpty val={data.orig_title}>
              <h3 className='video-subtitle'>{data.orig_title}</h3>
            </IsEmpty>
          </div>
        </div>
        {/* HEADER TITLE  END*/}
        {/* COUNTRY */}
        <IsEmpty val={data.media_info && data.media_info.countries}>
          <div className='video-page--countrie'>
            <div className='content-icon'>
              <Worldwide />
            </div>
            <ul className='info-text list-items'>
              {data.media_info?.countries &&
                data.media_info.countries.map((item: any) => {
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
        {data.media_info && data.media_info.genres?.length !== 0 && (
          <IsEmpty val={data.media_info?.genres}>
            <div className='video-page--genres'>
              <div className='content-icon'>
                <Tags />
              </div>
              <ul className='info-text list-items'>
                {data.media_info &&
                  data.media_info?.genres &&
                  data.media_info?.genres.map((item: any) => {
                    return (
                      <li key={item.id} className='list-item'>
                        {item.name}
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
        <IsEmpty val={data.media_info && data.media_info?.description}>
          <div className='video-page--actors'>
            <div className='content-icon'>
              <Catalogue />
            </div>
            <p className='info-text list-items'>
              {data.media_info?.description}
            </p>
          </div>
        </IsEmpty>
      </div>
    </div>
  );
};

export default VideoInfo;
