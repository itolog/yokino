import { makeStyles } from '@material-ui/core/styles';

const softorange = '#f4a259';
const tomatored = '#f25c66';

const useStyles = makeStyles(() => ({
  closeContainer: {
    position: 'relative',
    width: '50px',
    height: '50px',
    cursor: 'pointer',
    '&:hover $leftright': {
      transform: 'rotate(-45deg)',
      backgroundColor: tomatored,
    },
    '&:hover $rightleft': {
      transform: 'rotate(45deg)',
      backgroundColor: tomatored,
    },
  },

  leftright: {
    height: '4px',
    width: '50px',
    position: 'absolute',
    marginTop: '24px',
    backgroundColor: softorange,
    borderRadius: '2px',
    transform: 'rotate(45deg)',
    transition: 'all 0.3s ease-in',
  },


  rightleft: {
    height: '4px',
    width: '50px',
    position: 'absolute',
    marginTop: '24px',
    backgroundColor: softorange,
    borderRadius: '2px',
    transform: 'rotate(-45deg)',
    transition: 'all 0.3s ease-in',
  },

}));

export default useStyles;
