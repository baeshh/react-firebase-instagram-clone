/** @format */

import React from 'react';
import {
  Input,
  Button,
  IconButton,
  LinearProgress,
} from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import { useUpload } from '../../Firebase/uploadContext';

import { useStyles } from './Styles';

export default function Upload() {
  const classes = useStyles();
  const {
    caption,
    setCaption,
    handleUpload,
    progress,
    imagePreview,
    handlePreview,
    image,
    setImage,
  } = useUpload();

  const handleChange = async (e) => {
    if (e.target.files[0]) {
      await handlePreview(e.target.files[0]);
      await setImage(e.target.files[0]);
    }
  };

  console.log('preview:', imagePreview);
  return (
    <>
      <div className={classes.root}>
        <div className={classes.imageWrap}>
          <img
            src={imagePreview}
            alt=''
            className={classes.image}
          />
        </div>
        <div className={classes.uploadWrap}>
          <input
            type='file'
            onChange={handleChange}
            className={classes.input}
            style={{ display: 'none' }}
            id='raised-button-file'
          />
          <label htmlFor='raised-button-file'>
            <span>Add an image here 👉</span>
            <IconButton
              variant='raised'
              component='span'
              className={classes.button}
              color='primary'
            >
              <PhotoCamera className={classes.icon} />
            </IconButton>
          </label>
          <Input
            type='text'
            placeholder='enter a caption'
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className={classes.input}
            color='primary'
          />
          <div className={classes.upload}>
            <Button
              variant='contained'
              color='primary'
              onClick={handleUpload}
              disabled={!image}
            >
              upload
            </Button>

            <LinearProgress
              variant='determinate'
              color='primary'
              value={progress}
              className={classes.progress}
            />
          </div>
        </div>
      </div>
    </>
  );
}
