/** @format */

import './styles.css';
import React, { useContext } from 'react';
import Post from './components/Post/Post';
import { Typography } from '@material-ui/core';
import Upload from './components/Upload/Upload';
import Modal from './components/Modal/Modal';
import Users from './components/Users/Users';
import * as Auth from './Firebase/authContext';

export default function App() {
  const { username, posts, user } = Auth.useAuth();

  return (
    <>
      <div className='App'>
        <div className='app_header'>
          <img
            className='app_headerImage'
            src='https://firebasestorage.googleapis.com/v0/b/instagram-clone-app-ebf8a.appspot.com/o/logo%2Finstalogo.png?alt=media&token=7f38c3b4-6a80-4088-8c27-87779ddd2bbb'
            alt='instagram logo'
          />

<div className='app_username'>
            Hello 👋 {user ? username : 'Guest'}
          </div>

          <div className='app_login'>
            <Modal />
          </div>
        </div>
        <div className='app_body'>
          <Users />
          {username && <Upload />}  {/* 메시지 제거 후 업로드 컴포넌트만 조건부 렌더링 */}

          {posts &&
            posts.map((each) => (
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
    </>
  );
}
