import { Avatar } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";

import "../CSS/post.css";
function Post({ name, content, title, profileImage, likeCount }) {
  return (
    <div className="posts">
      <div className="post_header">
        <div className="post_header_left">
          <Avatar src={profileImage} />
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

        <div className="post_footer_option">
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
    </div>
  );
}

export default Post;
