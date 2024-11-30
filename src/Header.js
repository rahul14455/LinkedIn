import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./CSS/Header.css";
import HeaderOptions from "./HeaderOptions";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Dropdown from "./components/Dropdown";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ setSearch, setSearchData, search }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery); // Update parent state
    setLoading(true);

    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/linkedin/post?search={"title":"${searchQuery}","content":"${searchQuery}"}`,
        {
          headers: {
            projectID: "i1dieevrt9g1",
          },
        }
      );
      const data = await response.json();
      setSearchData(data.data); // Update search results in parent state
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setLoading(false);
  };

  const Homeclick = () => {
    navigate("/Home");
  };

  return (
    <div className="header">
      <div className="header_left">
        <div className="header_logo">
          <img
            onClick={Homeclick}
            src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png"
            alt="logo"
          />
        </div>

        <div className="header_search">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            onClick={Homeclick}
          />
          {loading && <p>Loading...</p>}
        </div>
      </div>

      <div className="header_right">
        <HeaderOptions Icon={HomeIcon} title="Home" />
        <HeaderOptions Icon={PeopleIcon} title="My Network" />
        <HeaderOptions Icon={BusinessCenterIcon} title="Jobs" />
        <HeaderOptions Icon={MessageIcon} title="Messaging" />
        <HeaderOptions Icon={NotificationsIcon} title="Notification" />

        <Dropdown title="Me" />

        <Link to="/premium">
          <HeaderOptions title="Try Premium for ₹0" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
