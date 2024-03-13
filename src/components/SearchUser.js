import React from "react";
import "../CSS/searchuser.css";

const SearchUser = () => {
  return (
    <div className="searchusers">
      <div class="card">
        <img src="profile-image.jpg" alt="Profile Image" />
        <h3>Name: John Doe</h3>
        <p>Email: johndoe@example.com</p>
        <p>Location: New York</p>
      </div>
    </div>
  );
};

export default SearchUser;
