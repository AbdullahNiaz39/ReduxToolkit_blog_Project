import React from "react";
import { useSelector } from "react-redux";
import { selectedAllUsers } from "../users/usersSlice";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectedAllUsers);
  const author = users.find((user) => user.id === userId);
  return <span>by {author ? author.name : "Unknown Author"}</span>;
};

export default PostAuthor;
