import React, { useState } from 'react';

import CustomCheckBox from '../../UI/CustomCheckBox/CustomCheckBox';

import './player.scss';

interface Props {
  src?: string | null;
  id?: string | null;
}

const Player: React.FC<Props> = ({ src = '', id }) => {
  const [player, togglePlayer] = useState(false);

  const handleChangePlayer = () => {
    togglePlayer(!player);
  };

  return (
    <section className='player-section'>
      <div className='player-checkbox'>
        <CustomCheckBox
          label='сменить плеер'
          isChecked={player}
          handleChange={handleChangePlayer}
        />
      </div>
      <div className='player'>
        {!player && (
          <iframe
            data-src={src}
            width='600'
            height='370'
            className='lazyload blur-up'
            frameBorder='0'
            title='player'
            allowFullScreen={true}
          />
        )}
        {/*  Alternative player*/}
        {player && (
          <iframe
            data-src={`https://yokino-api.herokuapp.com/player2?id=${id}`}
            width='600'
            height='370'
            className='lazyload blur-up'
            frameBorder='0'
            title='player'
            allowFullScreen={true}
          />
        )}
      </div>
    </section>
  );
};

export default Player;
