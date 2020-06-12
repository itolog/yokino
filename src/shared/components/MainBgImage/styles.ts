import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  mainbg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    filter: 'contrast(140%) blur(2px) opacity(80%)',
    boxShadow: '0px 10px 156px 110px rgba(26, 20, 59, 1)',
    '&:after': {
      content: '""',
      width: '100%',
      height: '100%',
      position: 'absolute',
      bottom: 0,
      left: 0,
      background: `linear-gradient(
    to bottom,
    rgba(30, 0, 66, 0.52) 30%,
    #1a143b 100%
)`,
    },
  },
}));

export default useStyles;