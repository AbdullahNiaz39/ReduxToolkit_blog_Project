import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectedAllUsers } from "../users/usersSlice";
import { addNewPost } from "./postsSlice";
const AddPostForm = () => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    userId: "",
  });
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const postHandleChange = (e) => {
    setPostData((postdata) => ({
      ...postdata,
      [e.target.name]: e.target.value,
    }));
  };

  const cansave =
    [postData.title, postData.content, postData.userId].every(Boolean) &&
    addRequestStatus === "idle";

  const dispatch = useDispatch();

  const onSavePost = (e) => {
    e.preventDefault();
    const title = postData.title;
    const content = postData.content;
    const userId = postData.userId;
    if (cansave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();
        setPostData({});
      } catch (err) {
        console.error("failed to save the psot", err);
        setAddRequestStatus("error");
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };
  const users = useSelector(selectedAllUsers);

  const usersOption = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="title"
          value={postData.title || ""}
          onChange={postHandleChange}
        />
        <label htmlFor="postUser">Author :</label>
        <select
          id="userAuthor"
          name="userId"
          value={postData.userId || ""}
          onChange={postHandleChange}
        >
          <option value="">Select Author</option>
          {usersOption}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="content"
          value={postData.content || ""}
          onChange={postHandleChange}
        />

        <button type="button" onClick={onSavePost} disabled={!cansave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
