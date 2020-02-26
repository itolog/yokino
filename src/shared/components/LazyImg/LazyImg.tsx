import React from 'react';

interface Props {
  src: string | undefined | null;
  alt?: string;
  width?: string;
  height?: string;
}

const LazyImg: React.FC<Props> = ({
  src,
  alt,
  width = '100%',
  height = '100%',
}) => {
  return (
    <img
      data-sizes='auto'
      alt={alt}
      data-src={src}
      width={width}
      height={height}
      className='lazyload blur-up'
    />
  );
};

export default LazyImg;
