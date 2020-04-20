import React, { memo } from 'react';

import { Trailers } from '../../../generated/graphql';

import Modal from '../../../components/Modal/Modal';

import './trailer.scss';

interface Props {
  trailers: Trailers[];
}

const Trailer: React.FC<Props> = memo(({ trailers }) => {
  return (
    <>
      <Modal titleButton='трейлер'>
        <div className='trailer-iframe--container'>
          <iframe
            src={trailers[0].iframe_url || ''}
            className='trailer-iframe lazyload blur-up'
            frameBorder='0'
          />
        </div>
      </Modal>
    </>
  );
});

export default Trailer;
