import React from 'react';

interface Props {
  src: string;
  alt: string;
  width?: string;
}

const LazyImg: React.FC<Props> = ({ src, alt, width = '200' }) => {
  return (
    <img
      data-sizes='auto'
      alt={alt}
      data-src={src}
      width={width}
      height={280}
      className='lazyload'
    />
  );
};

export default LazyImg;
