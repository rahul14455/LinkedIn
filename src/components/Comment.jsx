import React from "react";
import Avatar from "@mui/material/Avatar";

const Comment = ({ authorName, userRole = "", content = "" }) => {
  const avatar = authorName.charAt(0);
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
        <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
          {authorName}
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default Comment;
