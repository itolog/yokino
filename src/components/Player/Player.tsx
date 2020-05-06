import React, { memo, useState } from 'react';

import SpinLoader from '../../shared/UI/SpinLoader/SpinLoader';

import './player.scss';

interface Props {
  src?: string | null;
  id?: string | null;
}

const Player: React.FC<Props> = memo(({ src = '', id }) => {
  const [player, togglePlayer] = useState('1');
  const [isIframeLoad, setIsIframeLoad] = useState(false);

  const handlePickPlayer1 = () => {
    setIsIframeLoad(false);
    togglePlayer('1');
  };

  const handlePickPlayer2 = () => {
    setIsIframeLoad(false);
    togglePlayer('2');
  };

  const handlePickPlayer3 = () => {
    setIsIframeLoad(false);
    togglePlayer('3');
  };

  const handleIframeLoad = () => {
    setIsIframeLoad(true);
  };

  return (
    <section className='player-section'>
      <div className='player-checkbox'>
        <button
          onClick={handlePickPlayer1}
          className={
            player === '1'
              ? 'rainbow-button rainbow-button__active'
              : 'rainbow-button'
          }>
          плеер 1
        </button>
        <button
          onClick={handlePickPlayer2}
          className={
            player === '2'
              ? 'rainbow-button rainbow-button__active'
              : 'rainbow-button'
          }>
          плеер 2
        </button>
        <button
          onClick={handlePickPlayer3}
          className={
            player === '3'
              ? 'rainbow-button rainbow-button__active'
              : 'rainbow-button'
          }>
          плеер 3
        </button>
      </div>
      <div className='player'>
        {!isIframeLoad && (
          <div className='wrappSpinLoader'>
            <SpinLoader />
          </div>
        )}
        {player === '1' && src && (
          <iframe
            src={src}
            width='600'
            height='370'
            frameBorder='0'
            title='player'
            onLoad={handleIframeLoad}
            allowFullScreen={true}
          />
        )}
        {/*  Alternative player*/}
        {player === '2' && (
          <iframe
            src={`https://8954.videocdn.pw/wn5b6cebGMkf?kp_id=${id}`}
            width='600'
            height='370'
            frameBorder='0'
            title='player'
            onLoad={handleIframeLoad}
            allowFullScreen={true}
          />
        )}

        {/*  Alternative player*/}
        {player === '3' && (
          <iframe
            src={`https://yokino-api.herokuapp.com/player2?id=${id}`}
            width='600'
            height='370'
            frameBorder='0'
            title='player'
            onLoad={handleIframeLoad}
            allowFullScreen={true}
          />
        )}
      </div>
    </section>
  );
});

export default Player;
