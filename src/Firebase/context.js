/** @format */

//1.
import React, { useEffect, useState } from 'react';
import { db, auth, storage } from './firebase';

//2.
export const AuthContext = React.createContext('default');

//3.
export const AuthProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSignin, setOpenSignin] = useState(false);

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });

    const unsubscribe = auth.onAuthStateChanged(
      (authUser) => {
        if (authUser) {
          //user has loged in
          console.log('user:', authUser);
          setUser(authUser);
          setUsername(user.displayName);
        } else {
          //user has loged out
          setUser(null);
          setUsername('');
        }
      }
    );

    console.log('context posts', posts);

    return () => {
      //perform cleanup before refire useeffect
      unsubscribe();
    };
  }, [user, username]);

  const signup = (e) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };

  const signout = (e) => {
    auth.signOut();
  };

  const signin = (e) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignin(false);
  };

  const demoSignin = (e) => {
    auth
      .signInWithEmailAndPassword(
        'demosignup@gmail.com',
        'abc123'
      )
      .catch((error) => alert(error.message));

    setOpenSignin(false);
  };

  function handleDelete() {
    db.collection('posts')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }

  // Upload Component

  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  // const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState();

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

  const handleChange = (e) => {
    if (e.target.files[0]) {
      console.log('file:', e.target.files[0]);
      setImage(e.target.files[0]);
      handlePreview(e.target.files[0]);
    }
  };

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
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        posts,
        setPosts,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        signup,
        signout,
        signin,
        demoSignin,
        handleDelete,
        handleChange,
        handleUpload,
        handlePreview,
        progress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
