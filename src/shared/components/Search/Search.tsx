import { navigate } from 'gatsby';
import React, { useState } from 'react';

import './search.scss';

const Search = () => {
  const [inputValue, setInputValue] = useState();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate(`/search?query=${inputValue}`);
  };
  return (
    <form onSubmit={handleSubmit} className='search-form'>
      <input
        placeholder='&#128269; поиск'
        type='text'
        aria-label='search form'
        onChange={handleInputChange}
        className='search-input'
      />
    </form>
  );
};

export default Search;
