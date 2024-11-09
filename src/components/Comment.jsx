import React from "react";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import { deleteCommentAPI } from "../api/comment.api";
import DeleteIcon from "@mui/icons-material/Delete";

const Comment = ({
  authorName,
  userRole = "",
  content = "",
  commentId,
  postId,
  handleGetComments,
}) => {
  const avatar = authorName.charAt(0);
  const deleteComment = async () => {
    try {
      const res = await deleteCommentAPI(commentId);
      handleGetComments(postId);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div style={{ display: "flex", gap: "15px", padding: "12px" }}>
      {" "}
      <Avatar
        sx={{
          bgcolor: "orange",
          width: "36px !important",
          height: "36px !important",
        }}
      >
        {avatar}
      </Avatar>
      <div
        style={{
          width: "80%",
          background: "#F2F2F2",
          padding: "2px 16px 5px",
          borderRadius: "16px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
              {authorName}
            </div>
            <div>{content}</div>
          </div>
          <IconButton onClick={deleteComment}>
            <DeleteIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Comment;
