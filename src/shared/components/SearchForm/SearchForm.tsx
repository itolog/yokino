import React from 'react';

import './searchFrom.scss';

const SearchForm = () => {
  return (
    <form method='get' action='/search' target='_top'>
      <input
        id='search'
        name='q'
        type='text'
        aria-label='search'
        placeholder='поиск'
        className='searchform'
      />
    </form>
  );
};

export default SearchForm;
