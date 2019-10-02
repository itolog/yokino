import React from 'react';
import IsEmpty from '../IsEmpty/IsEmpty';

import Calendar from '../../../assets/img/calendar.svg';
import Catalogue from '../../../assets/img/catalogue.svg';
import Producers from '../../../assets/img/producer.svg';
import Star from '../../../assets/img/star.svg';
import Time from '../../../assets/img/stopclock.svg';
import Tags from '../../../assets/img/tags.svg';
import Actors from '../../../assets/img/theatre.svg';
import Worldwide from '../.././../assets/img/worldwide.svg';
import LazyImg from '../LazyImg/LazyImg';

import './videoInfo.scss';

interface Props {
  data: any;
}

const VideoInfo: React.FC<Props> = ({ data }) => {
  return (
    <div className='video-info'>
      <IsEmpty val={data.material_data.poster_url}>
        <div className='content-poster'>
          <div className='video-poster'>
            <LazyImg
              src={data.material_data.poster_url}
              alt={data.title}
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
            <IsEmpty val={data.material_data.imdb_rating}>
              <div className='video-page--raite'>
                <div className='content-icon'>
                  <Star/>
                </div>
                <span className='info-text'>
                  {data.material_data.imdb_rating} / 10
                </span>
              </div>
            </IsEmpty>
            {/*  Duration */}
            <IsEmpty val={data.material_data.duration}>
              <div className='video-page--raite'>
                <div className='content-icon'>
                  <Time/>
                </div>
                <span className='info-text'>
                  {data.material_data.duration} мин.
                </span>
              </div>
            </IsEmpty>
            {/* YEAR */}
            <IsEmpty val={data.material_data.year}>
              <div className='video-page--year'>
                <div className='content-icon'>
                  <Calendar/>
                </div>
                <span className='info-text'>{data.material_data.year}</span>
              </div>
            </IsEmpty>
          </div>
          {/*  TITLE */}
          <div className='title-left'>
            <IsEmpty val={data.title}>
              <h1 className='video-title'>{data.title}</h1>
            </IsEmpty>
            <IsEmpty val={data.title_orig}>
              <h3 className='video-subtitle'>{data.title_orig}</h3>
            </IsEmpty>
          </div>
        </div>
        {/* HEADER TITLE  END*/}
        {/* COUNTRY */}
        <IsEmpty val={data.material_data.countries}>
          <div className='video-page--countrie'>
            <div className='content-icon'>
              <Worldwide/>
            </div>
            <ul className='info-text list-items'>
              {data.material_data.countries && data.material_data.countries.map((item: any) => {
                return <li key={item} className='list-item'>{item}</li>;
              })}
            </ul>
          </div>
        </IsEmpty>
        {/* GENRES */}
        <IsEmpty val={data.material_data.genres}>
          <div className='video-page--genres'>
            <div className='content-icon'>
              <Tags/>
            </div>
            <ul className='info-text list-items'>
              {data.material_data.genres && data.material_data.genres.map((item: any) => {
                return <li key={item} className='list-item'>{item}</li>;
              })}
            </ul>
          </div>
        </IsEmpty>
        {/*  Producers*/}
        <IsEmpty val={data.material_data.producers}>
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
        </IsEmpty>
        {/*  Actors */}
        <IsEmpty val={data.material_data.actors}>
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
        </IsEmpty>

        {/*  Description */}
        <IsEmpty val={data.material_data.description}>
          <div className='video-page--actors'>
            <div className='content-icon'>
              <Catalogue/>
            </div>
            <p className='info-text list-items'>
              {data.material_data.description}
            </p>
          </div>
        </IsEmpty>
      </div>
    </div>
  );
};

export default VideoInfo;
