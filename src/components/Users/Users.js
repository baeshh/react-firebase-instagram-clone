/** @format */

import React from 'react';
import { useStyles } from './Styles';
import { Avatar } from '@material-ui/core';

export default function Users() {
  const classes = useStyles();

  const url = 'https://i.pravatar.cc/150?img=';
  const urlNumbers = ['1', '2', '3', '4', '5', '6', '7'];

  return (
    <div className={classes.root}>
      {urlNumbers.map((number) => (
        <Avatar
          alt=''
          src={url + number}
          className={classes.large}
        />
      ))}
    </div>
  );
}
