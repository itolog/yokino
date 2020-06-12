import { useNavigate } from '@reach/router';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { useLazyQuery } from '@apollo/react-hooks';
import { Collection } from '../../shared/generated/graphql';

import useStyles from './styles';

import { COLLECTION } from '../../shared/ggl/collection';

import Modal from '../../shared/UI/Modal/Modal';

const CollectionModal = memo(() => {
  const classes = useStyles();

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
    await navigate(`/collection?id=${id}&page=1`, {
      replace: true,
    });
  };


  return (
    <div className={classes.collection}>
      <Modal
        titleButton='подборки'
        styleOpenBtn={classes.collectioBtn}
        onClick={handleOpenCollection}
      >
        <div className={classes.collectionContainer}>
          <ul className={classes.collectionList}>
            {collection && collection.map(item => {
              return (
                <li
                  key={item?.id?.toString()}
                  data-id={item.id}
                  className={classes.collectionItems}
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
