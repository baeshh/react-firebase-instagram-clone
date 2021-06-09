/** @format */

//1.
import React, {
  useEffect,
  useState,
  useContext,
} from 'react';
import { db, auth } from './firebase';

//2.
const AuthContext = React.createContext('default');

function useAuth() {
  return useContext(AuthContext);
}
//3.
const AuthProvider = ({ children }) => {
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
          setUsername(authUser.displayName);
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

  const signup = async (e) => {
    try {
      const authUser = auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await authUser.user.updateProfile({
        displayName: username,
      });
    } catch {
      (error) => alert(error.message);
    }
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

  function handleDelete(id) {
    console.log('click delete');
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

  const value = {
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
    openSignin,
    setOpenSignin,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuth };
