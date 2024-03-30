import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import getAllChannels from "../../utils/getAllChannels";
import { SuggestedGroupCard } from "../Groups/Groups";
import "../CSS/singlegroup.css";
import { createPortal } from "react-dom";
const SingleGroup = () => {
  const { darkMode } = useDarkMode();
  const { name, id } = JSON.parse(localStorage.getItem("userDetails"));
  const [suggestedGroups, setSuggestedGroups] = useState([]);
  const [group, setGroup] = useState(null);
  const [groupPosts, setGroupPosts] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const params = useParams();
  const [loader, setLoader] = useState(true);
  const [groups, setGroups] = React.useState(() => {
    const myGroups = sessionStorage.getItem("linkedin-myGroups");
    if (myGroups) {
      return JSON.parse(myGroups);
    }
    return [];
  });
  async function getGroupPosts(id) {
    try {
      const token = sessionStorage.getItem("userToken");
      const response1 = await axios.get(
        `https://academics.newtonschool.co/api/v1/linkedIn/channel/${id}/posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "f104bi07c490",
          },
        }
      );

      const response2 = await axios.get(
        `https://academics.newtonschool.co/api/v1/linkedIn/channel/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "f104bi07c490",
          },
        }
      );
      setGroupPosts(response1.data.data);
      setGroup(response2.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setLoader(false);
    }
  }
  function addToMyGroups() {
    const myGroups = sessionStorage.getItem("linkedin-myGroups");
    if (myGroups) {
      let parsedMyGroups = JSON.parse(myGroups);
      parsedMyGroups = [...parsedMyGroups, group];
      sessionStorage.setItem(
        "linkedin-myGroups",
        JSON.stringify(parsedMyGroups)
      );
    } else {
      sessionStorage.setItem("linkedin-myGroups", JSON.stringify([group]));
    }
    setGroups((prev) => {
      return JSON.parse(sessionStorage.getItem("linkedin-myGroups"));
    });
  }
  function leaveGroup() {
    const myGroups = sessionStorage.getItem("linkedin-myGroups");
    let parsedMyGroups = JSON.parse(myGroups);
    let filteredyGroups = parsedMyGroups.filter((item) => {
      return group._id !== item._id;
    });
    sessionStorage.setItem(
      "linkedin-myGroups",
      JSON.stringify(filteredyGroups)
    );
    setGroups((prev) => {
      return filteredyGroups;
    });
  }
  useEffect(() => {
    setLoader(true);
    getAllChannels(setSuggestedGroups, setLoading);
    // getGroup(params.id)
    getGroupPosts(params.id);
  }, [params.id]);
  return <div></div>;
};

export default SingleGroup;
