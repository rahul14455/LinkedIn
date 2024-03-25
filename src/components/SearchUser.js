import React from "react";
import "../CSS/searchuser.css";

const SearchUser = (props) => {
  console.log(props);
  const { userData } = props;
  return (
    <div className="searchusers">
      <div class="card">
        <img src="profile-image.jpg" alt="Profile Image" />
        <h3>Name: {userData?.author?.name}</h3>
        <p>Content: {userData?.content}</p>
      </div>
    </div>
  );
};

export default SearchUser;
