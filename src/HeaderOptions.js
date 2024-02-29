import React from "react";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";

function HeaderOptions({ Icon, title }) {
  return (
    <div className="header_options">
      {Icon && <Icon></Icon>}
      <span>{title}</span>
    </div>
  );
}

export default HeaderOptions;
