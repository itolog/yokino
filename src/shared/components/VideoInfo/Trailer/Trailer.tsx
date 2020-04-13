import React, { memo, useState } from 'react';

import { Trailers } from '../../../generated/graphql';
import CloseBtn from '../../../UI/CloseBtn/CloseBtn';

import './trailer.scss';

interface Props {
  trailers: Trailers[];
}

const Trailer: React.FC<Props> = memo(({ trailers }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenTrailer = () => {
    setIsVisible(true);
  };

  const handleCloseTrailer = () => {
    setIsVisible(false);
  };

  return (
    <div className='trailer'>
      <button onClick={handleOpenTrailer} className='trailer-open'>
        трейлер
      </button>
      <div className={isVisible ? 'showTrailer' : 'hideTrailer'}>
        <div className='trailer-close'>
          <CloseBtn onclick={handleCloseTrailer} />
        </div>

        {isVisible && (
          <div className='trailer-iframe--container'>
            <iframe
              src={trailers[0].iframe_url || ''}
              className='trailer-iframe lazyload blur-up'
              frameBorder='0'
            />
          </div>
        )}
      </div>
    </div>
  );
});

export default Trailer;
