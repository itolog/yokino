import { useNavigate } from '@reach/router';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { useLazyQuery } from '@apollo/react-hooks';
import { Collection } from '../../shared/generated/graphql';

import './collectionModal.scss';

import { COLLECTION } from '../../shared/ggl/collection';

import Modal from '../../shared/UI/Modal/Modal';

const CollectionModal = memo(() => {
  const navigate = useNavigate();

  const [ collection, setCollection ] = useState<Collection[]>();
  const [ getCollection, { data } ] = useLazyQuery(COLLECTION);

  useEffect(() => {
    if (data && data.collection) {
      setCollection(data.collection);
    }
  }, [ data ]);

  const handleOpenCollection = useCallback(() => {
    getCollection();
  }, []);

  const handleNavigation = async (e: React.SyntheticEvent<HTMLLIElement>) => {
    const id = e.currentTarget.dataset.id;
    await navigate(`/collection?id=${id}`, {
      replace: true,
    });
  };


  return (
    <div className='collection'>
      <Modal
        titleButton='подборки'
        styleOpenBtn='collectio-btn'
        onClick={handleOpenCollection}
      >
        <div className='collection-container'>
          <ul className='collection-list'>
            {collection && collection.map(item => {
              return (
                <li
                  key={item?.id?.toString()}
                  data-id={item.id}
                  className='collection-items'
                  onClick={handleNavigation}
                >{item.name}</li>
              );
            })}
          </ul>
        </div>
      </Modal>
    </div>
  );
});

export default CollectionModal;
