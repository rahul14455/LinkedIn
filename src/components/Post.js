import React, { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { deletePost, likeAPost } from "../api/post.api";
import Avatar from "@mui/material/Avatar";
import "../CSS/post.css";
import Comment from "./Comment";
import { getComments } from "../api/comment.api";
import userDetails from "../utils/userDetails";
import { Tooltip } from "@mui/material";

function Post({
  name,
  content,
  title,
  profileImage,
  likeCount: initialLikeCount,
  key,
  userid,
  postId,
  setToggle,
  isLiked: initialIsLiked,
  handleUpdatePost,
  handleOpen,
  commentCount,
}) {
  const navigate = useNavigate();
  const handleAvatarClick = (userId) => {
    navigate(`/Profile/${userId}`);
  };

  const userId = JSON.parse(localStorage.getItem("userDetails"))._id;
  const likedPostsKey = `likedPosts_${userId}`;
  const likeCountKey = `likeCount_${userId}_${postId}`;

  // Initialize state with local storage values or initial props
  const [isLiked, setIsLiked] = useState(() => {
    const likedPosts = JSON.parse(localStorage.getItem(likedPostsKey) || "[]");
    return likedPosts.includes(postId);
  });

  const [likeCount, setLikeCount] = useState(() => {
    const storedLikeCount = localStorage.getItem(likeCountKey);
    return storedLikeCount ? parseInt(storedLikeCount) : initialLikeCount;
  });

  const [showCommentInput, setShowCommentInput] = useState(false);
  const [inputData, setInputData] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [open, setOpen] = useState(null);

  const { userName } = userDetails();
  const avatar = userName ? userName.charAt(0) : "R";

  const handleLikeAPost = async () => {
    try {
      // Retrieve current liked posts from local storage
      const likedPosts = JSON.parse(
        localStorage.getItem(likedPostsKey) || "[]"
      );

      if (!isLiked) {
        // Like the post
        await likeAPost(postId);

        // Add post to liked posts in local storage
        const updatedLikedPosts = [...likedPosts, postId];
        localStorage.setItem(likedPostsKey, JSON.stringify(updatedLikedPosts));

        // Increment and store like count
        const newLikeCount = likeCount + 1;
        setLikeCount(newLikeCount);
        localStorage.setItem(likeCountKey, newLikeCount.toString());

        setIsLiked(true);
      } else {
        // Unlike the post
        await likeAPost(postId); // Assuming this toggles like/unlike

        // Remove post from liked posts in local storage
        const updatedLikedPosts = likedPosts.filter((id) => id !== postId);
        localStorage.setItem(likedPostsKey, JSON.stringify(updatedLikedPosts));

        // Decrement and store like count
        const newLikeCount = likeCount - 1;
        setLikeCount(newLikeCount);
        localStorage.setItem(likeCountKey, newLikeCount.toString());

        setIsLiked(false);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const AddComment = async () => {
    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/linkedin/comment/${postId}`,
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
            projectid: "i1dieevrt9g1",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ content: inputData }),
        }
      );
      const jsonResponse = await response.json();
      handleGetComments(postId);
      setInputData("");
      if (response.ok) {
        setToggle((prevToggle) => !prevToggle);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const editthepost = () => {
    handleUpdatePost(content, postId);
    handleOpen();
  };

  const handleDeletePost = async (postId) => {
    const res = await deletePost(postId);
    setToggle((prev) => !prev);
  };

  const handleCommentChange = (e) => {
    setInputData(e.target.value);
  };

  const handleGetComments = async (postId) => {
    const res = await getComments(postId);
    setCommentData(res?.data);
  };

  return (
    <div className="posts">
      <div className="post_header">
        <div className="post_header_left">
          <Avatar
            src={profileImage}
            onClick={() => handleAvatarClick(userid)}
            style={{ cursor: "pointer" }}
          />
          <div className="post_profile_details">
            <h3>{name}</h3>
            <p>{title}</p>
          </div>
        </div>
        <IconButton
          onClick={(e) => {
            const currentUserId = JSON.parse(
              localStorage.getItem("userDetails")
            )._id;
            if (userid === currentUserId) {
              handleOpenMenu(e);
            }
          }}
          style={{
            visibility:
              userid === JSON.parse(localStorage.getItem("userDetails"))._id
                ? "visible"
                : "hidden",
          }}
        >
          <MoreVertIcon />
        </IconButton>

        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: { width: 140 },
          }}
        >
          <MenuItem onClick={editthepost}>Edit</MenuItem>

          <MenuItem
            onClick={() => {
              handleDeletePost(postId);
            }}
          >
            Delete
          </MenuItem>
        </Popover>
      </div>

      <div className="post_body">
        <p>{content}</p>
      </div>

      <div className="post_footer">
        <div className="post_footer_option">
          <ThumbUpIcon
            onClick={handleLikeAPost}
            style={{ color: isLiked ? "blue" : "gray" }}
          />
          <span>{likeCount}</span>
          <span style={{ marginLeft: "2px" }}> Like</span>
        </div>

        <div
          className="post_footer_option"
          onClick={() => {
            setShowCommentInput((prev) => !prev);
            handleGetComments(postId);
          }}
        >
          <CommentIcon />
          <span>Comment</span>
          <span>{commentCount}</span>
        </div>

        <div className="post_footer_option">
          <Tooltip title="Under Construction">
            <IconButton>
              <ShareIcon />
            </IconButton>
            <span>Share</span>
          </Tooltip>
        </div>

        <div className="post_footer_option">
          <Tooltip title="Under Construction">
            <IconButton>
              <SendIcon />
            </IconButton>
            <span>Send</span>
          </Tooltip>
        </div>
      </div>
      {showCommentInput && (
        <div>
          <div
            style={{
              display: "flex",
              gap: "12px",
              margin: "10px 10px",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "orange",
                width: "36px !important",
                height: "36px !important",
              }}
            >
              {avatar}
            </Avatar>
            <input
              value={inputData}
              placeholder="Add a comment ..."
              style={{ width: "70%", borderRadius: "10px" }}
              onChange={handleCommentChange}
            />
            <button
              style={{
                color: "blue",
                backgroundColor: "white",
                boxShadow: "none",
                border: "none",
              }}
              onClick={AddComment}
              disabled={!inputData}
            >
              Post
            </button>
          </div>
          {commentData.length > 0 &&
            commentData.map((singlecomment) => (
              <Comment
                key={singlecomment?._id}
                authorName={singlecomment?.author_details?.name}
                content={singlecomment?.content}
                commentId={singlecomment?._id}
                handleGetComments={handleGetComments}
                postId={postId}
                setToggle={setToggle}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default Post;
