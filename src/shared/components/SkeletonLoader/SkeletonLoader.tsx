import React from 'react';
import ContentLoader from 'react-content-loader';

export default function SkeletonLoader() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item: number, index: number) => {
        return (
          <div key={item} className='movie-card'>
            <ContentLoader
              height={300}
              width={200}
              speed={3}
              primaryColor=''
              secondaryColor='#ecebeb'
            >
              <rect x='0' y='0' rx='0' ry='0' width='100%' height='100%' />
            </ContentLoader>
          </div>
        );
      })}
    </>
  );
}
