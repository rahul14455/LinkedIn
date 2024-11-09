import React, { useEffect, useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import PhotoIcon from "@mui/icons-material/Photo";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TodayIcon from "@mui/icons-material/Today";
import AssignmentIcon from "@mui/icons-material/Assignment";
import "../CSS/feed.css";
import Post from "./Post";
import { Token } from "@mui/icons-material";
import ModalComponent from "./ModalComponent";
import Header from "../Header";
function Feed() {
  const [input, SetInput] = useState("");
  const [content, Setcontent] = useState();
  const [imagepost, Setimagepost] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  // const [postText, setPostText] = useState("");
  const [toggle, setToggle] = useState(false);
  const popupRef = useRef(null);
  const [postsData, setPostsData] = useState([]);
  const [selectedPostId, setPostId] = useState(null);
  // const [reloadPosts, setreloadPosts] = useState(true);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/linkedin/post?limit=100",
        {
          method: "GET",
          headers: {
            projectid: "ba3mq1ynqg62",
          },
        }
      );
      const jsonData = await response.json();
      setPostsData(jsonData.data);
      console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // setreloadPosts(false);
  };
  useEffect(() => {
    fetchData();
  }, [toggle]);

  const UploadPost = async () => {
    try {
      const form = new FormData();
      form.append("title", "title");
      form.append("content", content);
      if (imagepost) form.append("images", imagepost);
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/linkedin/post",
        {
          method: "POST",
          headers: {
            projectid: "ba3mq1ynqg62",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          // body: FormData,
          body: form,
        }
      );
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      if (response.ok) {
        setToggle((prevToggle) => !prevToggle);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // setreloadPosts(false);
  };

  const UpdatePost = async () => {
    try {
      const form = new FormData();
      form.append("title", "title");
      form.append("content", content);
      if (imagepost) form.append("images", imagepost);
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/linkedIn/post/${selectedPostId}`,
        {
          method: "PATCH",
          headers: {
            projectid: "ba3mq1ynqg62",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          // body: FormData,
          body: form,
        }
      );
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      if (response.ok) {
        setToggle((prevToggle) => !prevToggle);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // setreloadPosts(false);
  };
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  console.log(postsData);

  const handleUpdatePost = (content, postId) => {
    Setcontent(content);
    setPostId(postId);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="feed">
      <div className="feed_input">
        <div className="feed_form">
          {/* <Avatar onClick={() => navigate("/Profile")} /> */}
          <Avatar />
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Start a post"
              value={input}
              onClick={toggleModal}
              onChange={(e) => setInput(e.target.value)}
            />

            <ModalComponent
              open={isOpen}
              handleClose={() => {
                setIsOpen(false);
              }}
              SetInput={SetInput}
              Setcontent={Setcontent}
              UploadPost={selectedPostId ? UpdatePost : UploadPost}
              setToggle={setToggle}
              toggle={toggle}
              content={content}
            />
          </form>
        </div>
        <div className="feed_options">
          <div className="option">
            <PhotoIcon style={{ color: "#70b5f9" }} />
            <span>Photo</span>
          </div>

          <div className="option">
            <YouTubeIcon style={{ color: "#7fc15e" }} />
            <span>Video</span>
          </div>

          <div className="option">
            <TodayIcon style={{ color: "#e7a33e" }} />
            <span>Event</span>
          </div>

          <div className="option">
            <AssignmentIcon style={{ color: "#fc9295" }} />
            <span>Write Article</span>
          </div>
        </div>
      </div>
      {postsData.length > 0 &&
        postsData.map((post) => {
          // console.log(post._id, post);
          return (
            <Post
              key={post._id}
              userid={post.author._id}
              name={post.author.name}
              content={post.content}
              title={post.title}
              message="Playing with india is difficult under Kohli Captancy"
              profileImage={post.author.profileImage}
              likeCount={post.likeCount}
              postId={post._id}
              isLiked={post.isLiked}
              setToggle={setToggle}
              handleUpdatePost={handleUpdatePost}
              handleOpen={handleOpen}
            />
          );
        })}
      {/* <Post
        name="James Anderson"
        description="This is A test match"
        message="Playing with india is difficult under Kohli Captancy"
        profileImage="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_640,q_50/lsci/db/PICTURES/CMS/316500/316516.png"
        likeCount={25}
      /> */}
    </div>
  );
}

export default Feed;
