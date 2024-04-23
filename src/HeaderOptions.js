import React from "react";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
// import "./CSS/headeroption.css";

function HeaderOptions({ Icon, title, Avatar }) {
  return (
    <div className="header_options">
      {Icon && <Icon></Icon>}
      <span>{title}</span>
    </div>
  );
}

export default HeaderOptions;
