import React, { memo } from 'react';

import { Trailers } from '../../../generated/graphql';

import Modal from '../../../UI/Modal/Modal';

import useStyles from './styles';

interface Props {
  trailers: Trailers[];
}

const Trailer: React.FC<Props> = memo(({ trailers }) => {
  const classes = useStyles();
  return (
    <>
      <Modal
        styleOpenBtn={classes.bubblyButton}
        titleButton='трейлер'
      >
        <div className={classes.trailerIframeContainer}>
          <iframe
            src={trailers[ 0 ].iframe_url || ''}
            className={`${classes.trailerIframe} lazyload blur-up`}
            frameBorder='0'
          />
        </div>
      </Modal>
    </>
  );
});

export default Trailer;
