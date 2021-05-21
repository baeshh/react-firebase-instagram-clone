import React, { useState } from "react";
import { Input, Button, IconButton, LinearProgress } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";

import { makeStyles } from "@material-ui/core/styles";
import { storage, db } from "./../firebase";
import firebase from "@firebase/app";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "0.5px solid lightgrey",

    padding: theme.spacing(3),
    width: "450px",
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    alignItems: "center"
  },
  progress: {
    width: "50%",
    marginBottom: theme.spacing(2)
  },
  input: {
    width: "100%"
  },
  button: {
    margin: theme.spacing(1)
  }
}));

export default function Upload({ username }) {
  const classes = useStyles();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      console.log("file:", e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  function handleUpload() {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    console.log("image:", image);
    console.log("image name:", image.name);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside db
            console.log("url:" + url);
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username
            });
          });
        setProgress(0);
        setCaption("");
        setImage(null);
      }
    );
  }

  return (
    <>
      <div className={classes.root}>
        <Input
          type="text"
          placeholder="enter a caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className={classes.input}
          color="secondary"
        />
        <input
          type="file"
          onChange={handleChange}
          className={classes.input}
          style={{ display: "none" }}
          id="raised-button-file"
        />
        <label htmlFor="raised-button-file">
          <IconButton
            variant="raised"
            component="span"
            className={classes.button}
            color="secondary"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <LinearProgress
          variant="determinate"
          color="secondary"
          value={progress}
          className={classes.progress}
        />
        <Button variant="outlined" onClick={handleUpload}>
          Upload
        </Button>
      </div>
    </>
  );
}
