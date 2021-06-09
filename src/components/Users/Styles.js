/** @format */

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    display: 'flex',
    border: '0.5px solid lightgrey',
    maxWidth: '500px',
    margin: '20px auto',
    overflow: 'hidden',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

export { useStyles };
