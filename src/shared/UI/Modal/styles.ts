import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  modal: {
    position: 'relative',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
  },

  modalContent: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(16, 29, 43, 0.92)',
    opacity: 1,
    zIndex: 10000,
  },


  hideModalContent: {
    display: 'none',
  },

  showModalContent: {
    animation: '$slide-rotate-hor-bott 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
  },

  modalClose: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '1% 2%',
    background: 'rgba(16, 29, 43, 0.99)',
  },
  '@keyframes slide-rotate-hor-bott': {
    '0%': {
      transform: 'translateY(-150px) rotateX(-90deg)',
    },
    '100%': {
      transform: 'translateY(0) rotateX(0deg)',
    },
  },
}));

export default useStyles;
