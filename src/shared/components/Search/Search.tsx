import { navigate } from 'gatsby';
import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
// Store import
import { Actions } from '../../../state/menu/actions';

import './search.scss';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeNavbar: () => dispatch(Actions.closeMenu()),
});

type Props = ReturnType<typeof mapDispatchToProps>;

const Search: React.FC<Props> = ({ closeNavbar }) => {
  const [inputValue, setInputValue] = useState();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    closeNavbar();
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

export default connect(
  null,
  mapDispatchToProps
)(Search);
