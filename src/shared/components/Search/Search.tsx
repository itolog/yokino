import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { navigate } from 'gatsby';
import React, { memo, useState } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
// Store import
import { AppState } from '../../../state/createStore';
import { Actions } from '../../../state/menu/actions';
import { getMenu } from '../../../state/menu/selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [ theme.breakpoints.up('sm') ]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [ theme.breakpoints.up('sm') ]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);

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

const Search: React.FC<Props> = memo(({ closeNavbar, isMenuVisible }) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = String(e.target.value);
    setInputValue(value);
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (isMenuVisible) {
      closeNavbar();
    }
    if (!!inputValue.trim().length) {
      await navigate(`/search?query=${encodeURIComponent(inputValue)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon/>
        </div>
        <InputBase
          placeholder='поиск…'
          onChange={handleInputChange}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    </form>
  );
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
