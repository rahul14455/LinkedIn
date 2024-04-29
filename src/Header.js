import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "./CSS/Header.css";
import HeaderOptions from "./HeaderOptions";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Post from "./components/Post";
import SearchUser from "./components/SearchUser";
import Dropdown from "./components/Dropdown";
import Home from "./components/Home";
function Header(props) {
  const navigate = useNavigate();
  const { setSearchData, setSearch } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openprofile, setOpenProfile] = useState(false);
  const [input, setInput] = useState("");
  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setSearchTerm(searchQuery);
    setInput(e.target.value);
    setLoading(true);
    console.log(e.target.value);
    setSearch(e.target.value);

    try {
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/linkedin/post?search={"title":"${searchQuery}","content":"${searchQuery}"}`,
        {
          headers: {
            projectID: "ba3mq1ynqg62",
          },
        }
      );
      const data = await response.json();
      // console.log(data.data);
      setSearchResults(data.data);
      setSearchData(data.data);
      localStorage.setItem("searchdata", JSON.stringify(data.data));
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    setLoading(false);
  };

  function Homeclick() {
    navigate("/Home");
  }
  return (
    <div className="header">
      <div className="header_left">
        <div className="header_logo">
          <img
            onClick={Homeclick}
            src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png"
          />
        </div>
        <div className="header_search">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          {loading && <p>Loading...</p>}
          {/* {input && searchResults?.length && (
            <ul>
              {searchResults.map((result) => {
                console.log(result);
                return (
                  <div className="searchresults">
                    <li key={result._id}>
                      <p>Title: {result.title}</p>
                      <p>Author: {result.author}</p>
                      <p>Content: {result.content}</p>
                    </li>
                    <SearchUser userData={result} />
                  </div>
                );
              })}
            </ul>
          )} */}
        </div>
      </div>

      <div className="header_right">
        <HeaderOptions Icon={HomeIcon} title="Home" />
        <HeaderOptions Icon={PeopleIcon} title="My Network" />
        <HeaderOptions Icon={BusinessCenterIcon} title="Jobs" />
        <HeaderOptions Icon={MessageIcon} title="Messaging" />
        <HeaderOptions Icon={NotificationsIcon} title="Notification" />
        {/* <HeaderOptions
          Icon={Avatar}
          // title={JSON.parse(localStorage.getItem("userDetails")).name}
         
        /> */}
        <Dropdown title="Me" />
        {/* <div className="drop-down">
          <ul className="menu-list">
            <li>Profile</li>
            <li>Logout</li>
          </ul>
        </div> */}

        <Link to="/premium">
          <HeaderOptions title="Try Premium for ₹0" />
        </Link>
      </div>
    </div>
  );
}

export default Header;
