import React from "react";
import "../CSS/searchuser.css";

const SearchUser = (props) => {
  const { userData } = props;

  if (!userData || userData.length === 0) {
    return <div className="no-results">No search result found</div>;
  }

  return (
    <div className="searchusers">
      <div className="card">
        <img src="profile-image.jpg" alt="Profile" />
        <h3>Name: {userData?.author?.name}</h3>
        <p>Content: {userData?.content}</p>
      </div>
    </div>
  );
};

export default SearchUser;
