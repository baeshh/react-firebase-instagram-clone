/** @format */

import React from 'react';

import { Avatar, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import * as Auth from '../../Firebase/authContext';
import { useStyles } from './Styles';
import { useAuth } from '../../Firebase/authContext';
// import { db } from '../Firebase/firebase';

function Post({ imgUrl, username, caption, id }) {
  const classes = useStyles();
  const { handleDelete } = Auth.useAuth();

  console.log(username, caption, id);

  return (
    <div className={classes.post}>
      <div className={classes.post_header}>
        <Avatar
          alt='Remy Sharp'
          src='https://images.unsplash.com/photo-1534126416832-a88fdf2911c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80'
          className={classes.large}
        />
        <h3 className='post_userName'>{username}</h3>
      </div>

      <img
        src={imgUrl}
        alt='user avatar'
        className={classes.post_image}
      />
      <div className={classes.buttom}>
        <p className={classes.text}>
          <strong>{username}:</strong> {caption}
        </p>

        <IconButton
          variant='raised'
          component='span'
          className={classes.button}
          color='primary'
          onClick={() => handleDelete(id)}
        >
          <DeleteIcon
            aria-label='delete'
            className={classes.icon}
          />
        </IconButton>
      </div>
    </div>
  );
}

export default Post;

// function handleDelete() {
//   db.collection('posts')
//     .doc(id)
//     .delete()
//     .then(() => {
//       console.log('Document successfully deleted!');
//     })
//     .catch((error) => {
//       console.error('Error removing document: ', error);
//     });
// }
