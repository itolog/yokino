import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => {
  const commonStyle = {
    display: 'flex',
    flex: 1,
    flexFlow: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    [ theme.breakpoints.down(480) ]: {
      marginBottom: '8%',
    },
  };

  return {
    containerFilter: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-around',
      flexFlow: 'wrap',
      marginBottom: '5%',
      [ theme.breakpoints.down(480) ]: {
        flexDirection: 'column',
      },
    },

    wrappProgressBar: {
      height: '5px',
      width: '100%',
    },

    pickYear: {
      ...commonStyle,
      zIndex: 15,
    },

    pickGenres: {
      ...commonStyle,
    },

    movieCardList: {
      display: 'flex',
      flex: 3,
      flexFlow: 'row wrap',
      width: '100%',
      justifyContent: 'center',
      alignContent: 'flex-start',
      [ theme.breakpoints.down(1200) ]: {
        flex: 2,
      },
      [ theme.breakpoints.down(768) ]: {
        marginBottom: '5%',
      },
    },

    wrappListSerials: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
    },

    wrappListSerialsTitle: {
      color: 'white',
      marginBottom: '5px',
    },

  };
});

export default useStyles;
