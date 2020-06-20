import React from 'react';

interface Props {
  url: string;
  onLoad: () => void;
}

const playerW = '100%';
const playerH = 400;

const PlayerIframe: React.FC<Props> = ({ url, onLoad }) => {
  return (
    <iframe
      src={url}
      // @ts-ignore
      loading='lazy'
      width={playerW}
      height={playerH}
      frameBorder='0'
      title='player'
      onLoad={onLoad}
      allowFullScreen={true}
    />
  );
};

export default PlayerIframe;