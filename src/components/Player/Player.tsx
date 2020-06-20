import React, { memo, useState } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import PlayerIframe from './PlayerIframe';

import useStyles from './styles';

interface Props {
  src?: string | null;
  id?: string | null;
}

const Player: React.FC<Props> = memo(({ src = '', id }) => {
  const classes = useStyles();

  const [ player, togglePlayer ] = useState('1');
  const [ isIframeLoad, setIsIframeLoad ] = useState(false);

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
    <section className={classes.playerSection}>
      <div className={classes.playerCheckbox}>
        <button
          onClick={handlePickPlayer1}
          className={
            player === '1'
              ? `${classes.rainbowButton} ${classes.rainbowButtonActive}`
              : classes.rainbowButton
          }
        >
          плеер 1
        </button>
        <button
          onClick={handlePickPlayer2}
          className={
            player === '2'
              ? `${classes.rainbowButton} ${classes.rainbowButtonActive}`
              : classes.rainbowButton
          }
        >
          плеер 2
        </button>
        <button
          onClick={handlePickPlayer3}
          className={
            player === '3'
              ? `${classes.rainbowButton} ${classes.rainbowButtonActive}`
              : classes.rainbowButton
          }
        >
          плеер 3
        </button>
      </div>
      <div className={classes.player}>
        {!isIframeLoad && (
          <div className={classes.wrappSpinLoader}>
            <LinearProgress className={classes.linearSpiner}/>
          </div>
        )}
        {player === '1' && src && (
          <div className={classes.videoIframe}>
            <PlayerIframe
              url={src}
              onLoad={handleIframeLoad}
            />
          </div>
        )}
        {/*  Alternative player*/}
        {player === '2' && (
          <div className={classes.videoIframe}>
            <PlayerIframe
              url={`https://8954.videocdn.pw/wn5b6cebGMkf?kp_id=${id}`}
              onLoad={handleIframeLoad}
            />

          </div>
        )}

        {/*  Alternative player*/}
        {player === '3' && (
          <div className={classes.videoIframe}>
            <PlayerIframe
              url={`https://yokino-api.herokuapp.com/player2?id=${id}`}
              onLoad={handleIframeLoad}
            />
          </div>
        )}
      </div>
    </section>
  );
});

export default Player;
