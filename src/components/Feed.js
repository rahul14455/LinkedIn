import React, { useEffect, useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import PhotoIcon from "@mui/icons-material/Photo";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TodayIcon from "@mui/icons-material/Today";
import AssignmentIcon from "@mui/icons-material/Assignment";
import "../CSS/feed.css";
import Post from "./Post";
import { Token } from "@mui/icons-material";
import { Modal } from "@mui/material";
import ModalCompo from "./ModalCompo";

function Feed() {
  const [input, SetInput] = useState();
  const [content, Setcontent] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [postText, setPostText] = useState("");
  const popupRef = useRef(null);

  const submitPost = (e) => {
    e.preventDefault();
    // SetInput();
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handlePostChange = (event) => {
    setPostText(event.target.value);
  };

  const handlePost = () => {
    console.log("Posting:", postText);
    closePopup();
  };
  // Function to open the popup

  const [postsData, setPostsData] = useState([]);
  // const [reloadPosts, setreloadPosts] = useState(true);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/linkedin/post",
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
  }, []);

  const UploadPost = async () => {
    try {
      // const FormData = new FormData();
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/linkedin/post",
        {
          method: "POST",
          headers: {
            projectid: "ba3mq1ynqg62",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          // body: FormData,
          body: JSON.stringify({
            title: input,
            content: content,
            images: null,
          }),
        }
      );
      // const jsonData = await response.json();
      // setPostsData(jsonData.data);
      // console.log(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    // setreloadPosts(false);
  };
  return (
    <div className="feed">
      <div className="feed_input">
        <div className="feed_form">
          <Avatar />
          <form onSubmit={submitPost}>
            <input
              id="overlay"
              type="text"
              placeholder="Start a post"
              value={input}
              onChange={(e) => SetInput(e.target.value)}
              // disabled={true}
              onClick={setIsOpen}
            />
            <ModalCompo isOpen={isOpen} setIsOpen={setIsOpen} />

            <Modal
              title="Create a post"
              centered
              handleClose={() => {
                setIsOpen(false);
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <input
                className="modal-input"
                placeholder="What do You want to talk about"
              />
            </Modal>
            {/* {isOpen && (
              <div ref={popupRef} className="popup">
                <div className="popup-content">
                  <textarea
                    value={postText}
                    onChange={handlePostChange}
                    placeholder="Write your post here..."
                    rows={4}
                    cols={50}
                  />
                  <br />
                  <button onClick={handlePost}>Post</button>
                  <button onClick={closePopup}>Cancel</button>
                </div>
              </div>
            )} */}

            {/* <input
              type="text"
              value={content}
              placeholder="Content"
              onChange={(e) => Setcontent(e.target.value)}
            /> */}
            <input type="submit" />
          </form>
        </div>
        <div className="feed_options">
          <div className="option">
            <PhotoIcon style={{ color: "#70b5f9" }} />
            <span>Photo</span>
          </div>

          <div className="option">
            <YouTubeIcon style={{ color: "#7fc15e" }} />
            <span>Vedio</span>
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

      {/* <button
        onClick={() => {
          setreloadPosts(true);
        }}
      >
        Click
      </button> */}
      {postsData.length > 0 &&
        postsData.map((post) => {
          return (
            <Post
              key={post._id}
              name={post.author.name}
              content={post.content}
              title={post.title}
              message="Playing with india is difficult under Kohli Captancy"
              profileImage={post.author.profileImage}
              likeCount={post.likeCount}
            />
          );
        })}
      <Post
        name="James Anderson"
        description="This is A test match"
        message="Playing with india is difficult under Kohli Captancy"
        profileImage="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_640,q_50/lsci/db/PICTURES/CMS/316500/316516.png"
        likeCount={25}
      />
    </div>
  );
}

export default Feed;
