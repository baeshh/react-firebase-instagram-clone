/** @format */

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',

    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),

    margin: theme.spacing(2),
  },
  text: {
    margin: theme.spacing(2),
  },

  post: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    border: '0.5px solid lightgrey',
    maxWidth: '500px',
    margin: '20px auto',
  },

  post_header: {
    display: 'flex',
    alignItems: 'center',
  },
  post_image: {
    width: '100%',
    maxWidth: '500px',
    minWidth: '500px',
    minHeight: '500px',
    objectFit: 'contain',
    borderTop: '1px solid lightgrey',
    borderBottom: '1px solid lightgrey',
  },
  buttom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

export { useStyles };
