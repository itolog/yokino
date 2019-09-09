import React from 'react';

interface Props {
  src: string;
  alt: string;
  height?: string;
  width?: string;
}

const LazyImg: React.FC<Props> = ({
  src,
  alt,
  height = '260',
  width = '100',
}) => {
  return (
    <img
      data-sizes="auto"
      alt={alt}
      data-src={src}
      width={width}
      height={height}
      className="lazyload blur-up"
    />
  );
};

export default LazyImg;
