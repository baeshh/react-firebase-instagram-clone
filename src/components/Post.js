import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",

    "& > *": {
      margin: theme.spacing(1)
    }
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),

    margin: theme.spacing(2)
  },
  text: {
    margin: theme.spacing(2)
  },

  post: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    border: "0.5px solid lightgrey",
    maxWidth: "500px",
    margin: "20px auto"
  },

  post_header: {
    display: "flex",
    alignItems: "center"
  },
  post_image: {
    width: "100%",
    maxWidth: "500px",
    objectFit: "contain",
    borderTop: "1px solid lightgrey",
    borderBottom: "1px solid lightgrey"
  }
}));

function Post({ imgUrl, username, caption }) {
  console.log(imgUrl, username, caption);
  const classes = useStyles();
  return (
    <div className={classes.post}>
      <div className={classes.post_header}>
        <Avatar
          alt="Remy Sharp"
          src="https://images.unsplash.com/photo-1611367540679-d94566094025?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW4lMjBmYWNlfGVufDB8MnwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
          className={classes.large}
        />
        <h3 className="post_userName">{username}</h3>
      </div>

      <img src={imgUrl} alt="user avatar" className={classes.post_image} />

      <p className={classes.text}>
        <strong>{username}:</strong> {caption}
      </p>
      {/* username + caption */}
    </div>
  );
}

export default Post;
