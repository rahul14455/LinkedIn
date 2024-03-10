import React from "react";
import Header from "../Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widget from "./Widget";
import Login from "./Login";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Home from "./Home";
import { useEffect } from "react";
import Premium from "./Premium";

function App() {
  const token = localStorage.getItem("token");
  console.log({ token });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Premium" element={<Premium />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
