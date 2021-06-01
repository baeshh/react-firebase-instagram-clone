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

  const handleChange = (e) => {
    if (e.target.files[0]) {
      console.log('file:', e.target.files[0]);
      setImage(...image, e.target.files[0]);
      handlePreview(e.target.files[0]);
    }
  };

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

// const [caption, setCaption] = useState('');
// const [image, setImage] = useState('');
// const [url, setUrl] = useState('');
// const [progress, setProgress] = useState(0);
// const [imagePreview, setImagePreview] = useState();

// useEffect(() => {
//   setImagePreview(imagePreview);
// }, [imagePreview]);

// function handlePreview(image) {
//   storage.ref(`image_previews/${image.name}`).put(image);
//   storage
//     .ref('image_previews')
//     .child(image.name)
//     .getDownloadURL()
//     .then((url) => setImagePreview(url));
// }

// const handleChange = (e) => {
//   if (e.target.files[0]) {
//     console.log('file:', e.target.files[0]);
//     setImage(e.target.files[0]);
//     handlePreview(e.target.files[0]);
//   }
// };

// function handleUpload() {
//   const uploadTask = storage
//     .ref(`images/${image.name}`)
//     .put(image);
//   console.log('image:', image);
//   console.log('image name:', image.name);
//   uploadTask.on(
//     'state_changed',
//     (snapshot) => {
//       //progress function
//       const progress = Math.round(
//         (snapshot.bytesTransferred /
//           snapshot.totalBytes) *
//           100
//       );
//       setProgress(progress);
//     },
//     (error) => {
//       //error function
//       console.log(error);
//       alert(error.message);
//     },
//     () => {
//       //complete function
//       storage
//         .ref('images')
//         .child(image.name)
//         .getDownloadURL()
//         .then((url) => {
//           //post image inside db
//           console.log('url:' + url);
//           db.collection('posts').add({
//             timestamp:
//               firebase.firestore.FieldValue.serverTimestamp(),
//             caption: caption,
//             imageUrl: url,
//             username: username,
//           });
//         });
//       setProgress(0);
//       setCaption('');
//       setImage(null);
//       setImagePreview(null);
//     }
//   );
// }
