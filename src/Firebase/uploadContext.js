/** @format */

import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import { db, storage } from './firebase';
import firebase from '@firebase/app';

//2.
const UploadContext = React.createContext({});

function useUpload() {
  return useContext(UploadContext);
}

const UploadProvider = ({ children }) => {
  // Upload Component

  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [progress, setProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
//   const [url, setUrl] = useState('');

  useEffect(() => {
    setImagePreview(imagePreview);
  }, [imagePreview]);

  function handlePreview(image) {
    storage.ref(`image_previews/${image.name}`).put(image);
    storage
      .ref('image_previews')
      .child(image.name)
      .getDownloadURL()
      .then((url) => setImagePreview(url));
  }

  // const handleChange = (e) => {
  //   if (e.target.files[0]) {
  //     console.log('file:', e.target.files[0]);
  //     setImage(e.target.files[0]);
  //     handlePreview(e.target.files[0]);
  //   }
  // };

  function handleUpload() {
    const uploadTask = storage
      .ref(`images/${image.name}`)
      .put(image);
    console.log('image:', image);
    console.log('image name:', image.name);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        //progress function
        const progress = Math.round(
          (snapshot.bytesTransferred /
            snapshot.totalBytes) *
            100
        );
        setProgress(progress);
      },
      (error) => {
        //error function
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside db
            console.log('url:' + url);
            db.collection('posts').add({
              timestamp:
                firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
          });
        setProgress(0);
        setCaption('');
        setImage(null);
        setImagePreview(null);
      }
    );
  }

  const value = {
    // handleChange,
    handleUpload,
    handlePreview,
    progress,
    setProgress,
    caption,
    setCaption,
    image,
    setImage,
    imagePreview,
    setImagePreview,
  };
  return (
    <UploadContext.Provider value={value}>
      {children}
    </UploadContext.Provider>
  );
};

export { UploadContext, UploadProvider, useUpload };
