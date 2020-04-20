import React, { memo, useCallback, useEffect, useState } from 'react';

import { useLazyQuery } from '@apollo/react-hooks';

import { COLLECTION } from '../../shared/ggl/collection';

import Modal from '../../shared/components/Modal/Modal';

const CollectionModal = memo(() => {
  const [collection, setCollection] = useState();
  const [getCollection, { loading, data }] = useLazyQuery(COLLECTION);

  useEffect(() => {
    if (data && data.collection) {
      setCollection(data.collection);
    }
  }, [data]);

  const handleOpenCollection = useCallback(() => {
    getCollection();
  }, []);

  if (loading) return <p>Loading ...</p>;

  return (
    <div className='collection'>
      <Modal titleButton='подборки' onClick={handleOpenCollection}>
        <p>sdnvkvjsdnvknsd</p>
      </Modal>
    </div>
  );
});

export default CollectionModal;
