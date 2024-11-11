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
  setToggle,
}) => {
  // Initials for Avatar
  const avatar = authorName.charAt(0);

  // Function to handle comment deletion
  const deleteComment = async () => {
    try {
      await deleteCommentAPI(commentId);
      handleGetComments(postId); // Refresh comments after deletion
      setToggle((prev) => !prev);
    } catch (e) {
      console.error("Error deleting comment:", e);
    }
  };

  return (
    <div style={{ display: "flex", gap: "15px", padding: "12px 0" }}>
      <Avatar
        sx={{
          bgcolor: "orange",
          width: 36,
          height: 36,
        }}
      >
        {avatar}
      </Avatar>

      <div
        style={{
          width: "80%",
          backgroundColor: "#F2F2F2",
          padding: "8px 16px",
          borderRadius: "16px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
              {authorName}
              {userRole && (
                <span style={{ fontSize: "0.85em", marginLeft: "8px" }}>
                  {userRole}
                </span>
              )}
            </div>
            <div>{content}</div>
          </div>

          <IconButton onClick={deleteComment} size="small">
            <DeleteIcon sx={{ fontSize: "20px" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Comment;
