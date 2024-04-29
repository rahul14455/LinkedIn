import React from "react";
import "../CSS/sidebar.css";
import Avatar from "@mui/material/Avatar";
import { Link, json, useParams } from "react-router-dom";
import getUserDetails from "../utils/userDetails";

function Sidebar() {
  let userDetails = { name: getUserDetails().userName };
  return (
    <div className="sidebar">
      <div className="sidebar_profile">
        <img src="https://t4.ftcdn.net/jpg/05/71/83/47/240_F_571834789_ujYbUnH190iUokdDhZq7GXeTBRgqYVwa.jpg" />
        <div className="profile_details">
          <Avatar />
          <h4>{userDetails.name}</h4>
          <p>Full Stack Developer</p>
        </div>

        <div className="profile_stats">
          <span> Who viewed your profile </span>
          <span className="start_number"> 20 </span>
        </div>

        <div className="profile_stats">
          <span>
            Connection<br></br>
            <b>Grow Your Network </b>
          </span>
          <span className="start_number"> 150 </span>
        </div>
      </div>

      <div className="sidebar_recent">
        <div>
          <Link to="/groups">Groups</Link> <br />
          <Link to="#">Events</Link> <br />
          <Link to="#">Followed Hashtags</Link> <br />
        </div>
        <p>Discover more</p>
      </div>
    </div>
  );
}

export default Sidebar;
