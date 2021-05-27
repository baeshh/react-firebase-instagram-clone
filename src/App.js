/** @format */

import './styles.css';
import React, { useState, useEffect } from 'react';
import Post from './components/Post';
import { db, auth } from './firebase';
import { Typography } from '@material-ui/core';
import Upload from './components/Upload';
import Modal from './components/Modal';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

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
        console.log('posts:', posts);
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

    return () => {
      //perform cleanup before refire useeffect
      unsubscribe();
    };
  }, [user, username]);

  return (
    <div className='App'>
      <div className='app_header'>
        <img
          className='app_headerImage'
          src='https://firebasestorage.googleapis.com/v0/b/instagram-clone-app-ebf8a.appspot.com/o/logo%2Finstalogo.png?alt=media&token=7f38c3b4-6a80-4088-8c27-87779ddd2bbb'
          alt='instagram logo'
        />
        {username ? (
          <div className='app_username'>
            Hello 👋 {username}
          </div>
        ) : null}
        <div className='app_login'>
          <Modal />
        </div>
      </div>
      <div className='app_body'>
        {username ? (
          <Upload username={username} />
        ) : (
          <div className='app_loginRequest'>
            <Typography
              color='primary'
              variant='p'
              component='p'
              align='center'
              gutterBottom
            >
              Please to log in to post a photo
            </Typography>
          </div>
        )}

        {posts.map((each) => (
          <Post
            key={each.id}
            id={each.id}
            imgUrl={each.post.imageUrl}
            username={each.post.username}
            caption={each.post.caption}
          />
        ))}
      </div>
    </div>
  );
}
