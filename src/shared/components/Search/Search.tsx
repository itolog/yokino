import { navigate } from 'gatsby';
import React, { useState } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
// Store import
import { AppState } from '../../../state/createStore';
import { Actions } from '../../../state/menu/actions';
import { getMenu } from '../../../state/menu/selectors';

import './search.scss';

const mapStateToProps = (state: AppState) => {
  return {
    isMenuVisible: getMenu(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeNavbar: () => dispatch(Actions.closeMenu()),
});

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const Search: React.FC<Props> = ({ closeNavbar, isMenuVisible }) => {
  const [inputValue, setInputValue] = useState();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isMenuVisible) {
      closeNavbar();
    }
    navigate(`/search?query=${inputValue}`);
  };

  return (
    <form onSubmit={handleSubmit} className='search-form'>
      <input
        placeholder='&#128269; поиск'
        type='text'
        aria-label='search form'
        onChange={handleInputChange}
        autoComplete='on'
        className='search-input'
        tabIndex={0}
      />
    </form>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
