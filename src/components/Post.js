import { Avatar } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";

import "../CSS/post.css";
function Post({
  name,
  content,
  title,
  profileImage,
  likeCount,
  key,
  userid,
  postId,
}) {
  // const userId = "Id";
  const navigate = useNavigate();
  const handleAvatarClick = (userId) => {
    navigate(`/Profile/${userId}`);
  };
  const [showCommentInput, setShowCommentInput] = useState(false);
  console.log(userid);

  const AddComment = async () => {
    try {
      const form = new FormData();
      form.append("content", "Congragulations");
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/linkedin/comment/${postId}`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            projectid: "ba3mq1ynqg62",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          // body: FormData
          body: JSON.stringify({ content: "Hello" }),
        }
        // { content: "Hello" }
      );
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      if (response.ok) {
        setToggle((prevToggle) => !prevToggle);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // setreloadPosts(false);
  };
  return (
    <div className="posts">
      <div className="post_header">
        <div className="post_header_left">
          <Avatar
            src={profileImage}
            onClick={() => handleAvatarClick(userid)}
          />
          <div className="post_profile_details">
            <h3>{name}</h3>
            <p>{title}</p>
          </div>
        </div>
        <MoreVertIcon />
      </div>

      <div className="post_body">
        <p>{content}</p>
      </div>

      <div className="post_footer">
        <div className="post_footer_option">
          <ThumbUpIcon />
          <span>{likeCount}</span>
          <span>Like</span>
        </div>

        <div
          className="post_footer_option"
          onClick={() => {
            setShowCommentInput((prev) => !prev);
          }}
        >
          <CommentIcon />
          <span>Comment</span>
        </div>

        <div className="post_footer_option">
          <ShareIcon />
          <span>Share</span>
        </div>

        <div className="post_footer_option">
          <SendIcon />
          <span>Send</span>
        </div>
      </div>
      {showCommentInput && (
        <div>
          <input type="text" />
          <button onClick={() => AddComment()}>post</button>
        </div>
      )}
    </div>
  );
}

export default Post;
