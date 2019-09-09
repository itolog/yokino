import React from 'react';

import './player.scss';

interface Props {
  src?: string;
}

const Player: React.FC<Props> = ({ src = '' }) => {
  return (
    <>
      <div className="player">
        <iframe
          data-src={src}
          width="600"
          height="370"
          className="lazyload blur-up"
          frameBorder="0"
          allowFullScreen={true}
        />
      </div>
    </>
  );
};

export default Player;
