import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widget from "./Widget";
import Profile from "./Profile";
import SearchUser from "./SearchUser";

const Home = () => {
  const [search, setsearch] = useState(false);
  return (
    <div className="app_wrapper">
      <Header setsearch={setsearch} />
      <div className="app_body">
        <Sidebar />
        {search ? <SearchUser /> : <Feed />}
        <Widget />
      </div>
    </div>
  );
};

export default Home;
