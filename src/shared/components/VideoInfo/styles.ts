import { makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => {
  const vidioPageCommon = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    fontSize: '22px',
    margin: '15px 0',
    minWidth: '100px',
    boxShadow: '0 13px 8px -9px rgb(218, 216, 212)',
    [ theme.breakpoints.down(768) ]: {
      width: '100%',
      flexFlow: 'wrap column',
    },
  };

  return {
    videoInfo: {
      display: 'flex',
      flexFlow: 'wrap',
      justifyContent: 'center',
      padding: '20px',
      marginBottom: '2%',
      minHeight: '200px',
      [ theme.breakpoints.down(768) ]: {
        flexFlow: 'column',
      },
    },

    contentPoster: {
      position: 'relative',
      display: 'flex',
      boxShadow: '2px 2px 7px rgba(0, 0, 0, 0.6)',
      borderRadius: '10px',
      flexDirection: 'column',
      [ theme.breakpoints.down(768) ]: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      [ theme.breakpoints.down(480) ]: {
        width: '100%',
      },
    },

    contentIcon: {
      width: '25px',
      [ theme.breakpoints.down(768) ]: {
        width: '35px',
      },
    },

    wrappRate: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '150px',
    },

    videoPoster: {
      borderRadius: '10px',
      overflow: 'hidden',
      minHeight: '300px',
    },

    videoPageTitle: {
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'space-between',
      color: '#000',
      paddingBottom: '2%',
    },

    videoTitle: {
      marginBottom: '2%',
      fontSize: '1.2rem',
    },

    videoSubtitle: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },

    contentText: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      flexFlow: 'column',
      flex: 2,
      backgroundImage: `linear-gradient(
    to right top,
    #0b0816,
    #110c1f,
    #141028,
    #161232,
    #1a143b
)`,
      color: 'white',
      padding: '15px 25px 0 20px',
      borderRadius: '5px',
    },

    videoPageRaite: {
      ...vidioPageCommon,
      flexFlow: 'column wrap',
      boxShadow: 'none',
      [ theme.breakpoints.down(480) ]: {
        justifyContent: 'space-between',
        flexFlow: 'wrap row',
      },
    },

    videoPageYear: {
      ...vidioPageCommon,
      boxShadow: 'none',
      [ theme.breakpoints.down(480) ]: {
        justifyContent: 'space-between',
        flexFlow: 'wrap row',
      },
    },

    videoPageCountrie: {
      ...vidioPageCommon,
    },

    videoPageProducers: {
      ...vidioPageCommon,
    },

    videoPageGenres: {
      ...vidioPageCommon,
    },

    videoPageActors: {
      ...vidioPageCommon,
    },

    infoText: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#c8c0ed',
    },

    titleRight: {
      display: 'flex',
      justifyContent: 'space-between',
      [ theme.breakpoints.down(480) ]: {
        flexFlow: 'column',
      },
    },

    titleLeft: {
      paddingBottom: '2%',
      color: 'white',
    },

    listItems: {
      width: '80%',
      display: 'flex',
      flexFlow: 'wrap',
      justifyContent: 'space-around',
      fontSize: '1.1rem',
      color: '#c5c4dc',
      fontFamily: 'Roboto, Arial, Helvetica, Helvetica Neue, FreeSans, sans-serif',
      fontWeight: 500,
      [ theme.breakpoints.down(480) ]: {
        width: '100%',
        fontSize: '1rem',
      },
    },

    listItem: {
      '&:after': {
        content: '", "',
      },
      '&:last-child': {
        '&:after': {
          content: '""',
        },
      },
    },
  };
});

export default useStyles;
