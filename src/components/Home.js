import "../CSS/home.css";
import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widget from "./Widget";
import Profile from "./Profile";
import SearchUser from "./SearchUser";

const Home = () => {
  const [search, setSearch] = useState("");
  const [searchUserData, setSearchData] = useState([]);
  console.log({ search });

  return (
    <div className="app_wrapper">
      <Header setSearch={setSearch} setSearchData={setSearchData} />
      <div className="app_body">
        <Sidebar />

        {!search ? (
          <Feed />
        ) : (
          <>
            {searchUserData?.length > 0 ? (
              <div className="search-results">
                {searchUserData.map((result) => (
                  <div key={result.id} className="searchresults">
                    <SearchUser userData={result} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <p>No search results found</p>
              </div>
            )}
          </>
        )}

        <Widget />
      </div>
    </div>
  );
};

export default Home;
