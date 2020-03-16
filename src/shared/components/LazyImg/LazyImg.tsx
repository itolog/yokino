import React from 'react';

interface Props {
  src: string | undefined | null;
  alt?: string;
  width?: string;
  height?: string;
  styleImage?: React.CSSProperties;
}

const LazyImg: React.FC<Props> = ({
  src,
  alt,
  width = '100%',
  height = '100%',
                                    styleImage
}) => {
  return (
    <img
      data-sizes='auto'
      alt={alt}
      data-src={src}
      width={width}
      height={height}
      style={styleImage}
      className='lazyload blur-up'
    />
  );
};

export default LazyImg;
