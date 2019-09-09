import React from 'react';
import IsEmpty from '../IsEmpty/IsEmpty';

import Calendar from '../../../assets/img/calendar.svg';
import Star from '../../../assets/img/star.svg';
import Tags from '../../../assets/img/tags.svg';
import Worldwide from '../.././../assets/img/worldwide.svg';
import LazyImg from '../LazyImg/LazyImg';

import './videoInfo.scss';

interface Props {
  data: any;
}

const VideoInfo: React.FC<Props> = ({ data }) => {
  return (
    <div className="video-info">
      <IsEmpty val={data.material_data.poster}>
        <div className="content-poster">
          <div className="video-poster">
            <LazyImg
              width="200"
              height="300"
              src={data.material_data.poster}
              alt={data.title_ru}
            />
          </div>
        </div>
      </IsEmpty>
      {/* INFO */}
      <div className="content-text">
        {/* HEADER TITLE */}
        <div className="video-page--title">
          <div className="title-right">
            {/*  RATE */}
            <IsEmpty val={data.material_data.imdb_rating}>
              <div className="video-page--raite">
                <div className="content-icon">
                  <Star />
                </div>
                <span className="info-text">
                  {data.material_data.imdb_rating} / 10
                </span>
              </div>
            </IsEmpty>
            {/* YEAR */}
            <IsEmpty val={data.year}>
              <div className="video-page--year">
                <div className="content-icon">
                  <Calendar />
                </div>
                <span className="info-text">{data.year}</span>
              </div>
            </IsEmpty>
          </div>
          {/*  TITLE */}
          <div className="title-left">
            <IsEmpty val={data.title_ru}>
              <h1 className="video-title">{data.title_ru}</h1>
            </IsEmpty>
            <IsEmpty val={data.title_en}>
              <h3>{data.title_en}</h3>
            </IsEmpty>
          </div>
        </div>
        {/* HEADER TITLE  END*/}
        {/* COUNTRY */}
        <IsEmpty val={data.material_data.countries}>
          <div className="video-page--countrie">
            <div className="content-icon">
              <Worldwide />
            </div>
            <ul className="info-text countries">
              {data.material_data.countries.map((item: any) => {
                return <li key={item}>{item}</li>;
              })}
            </ul>
          </div>
        </IsEmpty>
        {/* GENRES */}
        <IsEmpty val={data.material_data.genres}>
          <div className="video-page--genres">
            <div className="content-icon">
              <Tags />
            </div>
            <ul className="info-text countries">
              {data.material_data.genres.map((item: any) => {
                return <li key={item}>{item}</li>;
              })}
            </ul>
          </div>
        </IsEmpty>
      </div>
    </div>
  );
};

export default VideoInfo;
