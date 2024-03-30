import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widget from "./Widget";
import Login from "./Login";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Home from "./Home";
import { useEffect } from "react";
import Premium from "./Premium";
import Profile from "./Profile";
import Groups from "./Groups";
import Header from "../Header";

function App() {
  const token = localStorage.getItem("token");
  console.log({ token });
  const [loading, setLoading] = useState(false);
  return (
    <BrowserRouter>
      <div>{/* <Header /> */}</div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Premium" element={<Premium />} />
        <Route path="/Profile/:id" element={<Profile />} />
        <Route
          path="/groups"
          element={<Groups loading={loading} setLoading={setLoading} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
