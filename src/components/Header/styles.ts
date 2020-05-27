import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: 'rgba(26, 20, 59, 1)',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    layout: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    searchContainer: {},
    title: {
      display: 'none',
      [ theme.breakpoints.up('sm') ]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [ theme.breakpoints.up('md') ]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [ theme.breakpoints.up('md') ]: {
        display: 'none',
      },
    },
  }),
);

export default useStyles;