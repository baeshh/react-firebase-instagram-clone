import "./styles.css";
import React, {
  useState,
  useEffect
} from "react";
import Post from "./components/Post";
import { db, auth } from "./firebase";
import { Typography } from "@material-ui/core";
import Upload from "./components/Upload";
import Modal from "./components/Modal";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.collection("posts").onSnapshot(
      (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data()
          }))
        );
        console.log("posts:", posts);
      }
    );

    const unsubscribe = auth.onAuthStateChanged(
      (authUser) => {
        if (authUser) {
          //user has loged in
          console.log("user:", authUser);
          setUser(authUser);
          setUsername(user.displayName);
        } else {
          //user has loged out
          setUser(null);
          setUsername("guest");
        }
      }
    );

    return () => {
      //perform cleanup before refire useeffect
      unsubscribe();
    };
  }, [user, username]);

  return (
    <div className="App">
      <div className="app_header">
        <img
          className="app_headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt="instagram logo"
        />
        <div className="app_login">
          <Modal />
        </div>
      </div>
      <div className="app_body">
        <Typography
          className="app_title"
          color="secondary"
          variant="h4"
          align="center"
          gutterBottom
        >
          Welcome to instagram ,{" "}
          <strong className="app_username">
            {username}
          </strong>
        </Typography>
        {username ? (
          <Upload username={username} />
        ) : (
          <Typography>
            Sorry you need to log in to upload
            images
          </Typography>
        )}

        {posts.map((each) => (
          <Post
            key={each.id}
            imgUrl={each.post.imageUrl}
            username={each.post.username}
            caption={each.post.caption}
          />
        ))}
      </div>
    </div>
  );
}
