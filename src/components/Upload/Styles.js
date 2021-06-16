/** @format */

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    border: '0.5px solid lightgrey',
    padding: theme.spacing(3),
    maxWidth: '450px',
    display: 'flex',
    flexDirection: 'row',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '300px',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  uploadWrap: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing(2),
  },
  progress: {
    width: 180,
    marginLeft: theme.spacing(2),
  },
  input: {
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
  upload: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    justifyContent: 'space-between',
  },
  uploadButton: {
    backgroundColor: '#f60257',
    border: 'none',
    color: 'white',
    '&:hover': {
      backgroundColor: '#f75d91',
    },
  },
  image: {
    height: '150px',
    width: '150px',
    objectFit: 'cover',
  },
  imageWrap: {
    height: '150px',
    width: '150px',
    backgroundColor: '#afafaf',
  },
}));
export { useStyles };
