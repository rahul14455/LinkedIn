import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { SuggestedGroupCard } from "./Groups";
import "../CSS/singlegroup.css";
import { createPortal } from "react-dom";
import userDetails from "../utils/userDetails";

function SingleGroup({ loading, setLoading }) {
  const { userName: name } = userDetails();
  const id = 1;
  const [suggestedGroups, setSuggestedGroups] = useState([]);
  const [group, setGroup] = useState(null);
  const [groupPosts, setGroupPosts] = useState([]);
  const darkMode = false;
  const [showPostModal, setShowPostModal] = useState(false);
  const params = useParams();
  const [loader, setLoader] = useState(true);
  const [groups, setGroups] = React.useState(() => {
    const myGroups = localStorage.getItem("linkedin-myGroups");
    if (myGroups) {
      return JSON.parse(myGroups);
    }
    return [];
  });

  // async function getGroup(id){

  //     try {
  //         const token = sessionStorage.getItem("userToken");
  //         const response = await axios.get(`https://academics.newtonschool.co/api/v1/linkedIn/channel/${id}`,
  //             {
  //                 headers: {
  //                     Authorization: `Bearer ${token}`,
  //                     projectID: 'f104bi07c490'
  //                 }
  //             }
  //         )
  //         setGroup(response.data.data)
  //     } catch (error) {
  //         console.log(error);
  //     }
  //     finally{
  //         setLoading(false)
  //     }
  // }
  async function getGroupPosts(id) {
    try {
      const token = localStorage.getItem("token");
      const response1 = await axios.get(
        `https://academics.newtonschool.co/api/v1/linkedIn/channel/${id}/posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "ba3mq1ynqg62",
          },
        }
      );

      const response2 = await axios.get(
        `https://academics.newtonschool.co/api/v1/linkedIn/channel/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "ba3mq1ynqg62",
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
    const myGroups = LocalStorage.getItem("linkedin-myGroups");
    if (myGroups) {
      let parsedMyGroups = JSON.parse(myGroups);
      parsedMyGroups = [...parsedMyGroups, group];
      LocalStorage.setItem("linkedin-myGroups", JSON.stringify(parsedMyGroups));
    } else {
      LocalStorage.setItem("linkedin-myGroups", JSON.stringify([group]));
    }
    setGroups((prev) => {
      return JSON.parse(LocalStorage.getItem("linkedin-myGroups"));
    });
  }
  function leaveGroup() {
    const myGroups = LocalStorage.getItem("linkedin-myGroups");
    let parsedMyGroups = JSON.parse(myGroups);
    let filteredyGroups = parsedMyGroups.filter((item) => {
      return group._id !== item._id;
    });
    LocalStorage.setItem("linkedin-myGroups", JSON.stringify(filteredyGroups));
    setGroups((prev) => {
      return filteredyGroups;
    });
  }
  async function getAllChannels(setSuggestedGroups, setLoading) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://academics.newtonschool.co/api/v1/linkedin/channel?limit=50",
        {
          headers: {
            projectID: "ba3mq1ynqg62",
          },
        }
      );

      setSuggestedGroups(response.data.data.reverse());
      console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    setLoader(true);
    getAllChannels(setSuggestedGroups, setLoading);
    // getGroup(params.id)
    getGroupPosts(params.id);
  }, [params.id]);
  return (
    !loading && (
      <>
        <>
          <div className="all-content-container">
            <div className="feedPage-layout-container-sg">
              {/* Grid layout */}
              <div className="feedPage-layout-sg">
                {/* sidebar */}
                <div className="feedPage-layout--sidebar-sg">
                  {/* Profile */}
                  <div className={`feedPage-layout--sidebar-profile-sg`}>
                    <div className="feedPage-layout--sidebar-profile-nameAndImage-sg">
                      <div className="feedPage-layout--sidebar-profile-cover-sg"></div>
                      <Link
                        to={`/profile/${id}`}
                        className="feedPage-layout--sidebar-profile-image-container-sg"
                      >
                        <div>
                          <img
                            className="feedPage-layout--sidebar-profile-image-sg"
                            src={`https://ui-avatars.com/api/?name=${name.slice(
                              0,
                              1
                            )}&background=random`}
                            alt=""
                          />
                        </div>
                        <div
                          className={`feedPage-layout--sidebar-profile-name ${
                            darkMode ? "dark" : ""
                          }`}
                        >
                          {name}
                        </div>
                        <div>
                          <p
                            className={`feedPage-layout--sidebar-profile-job ${
                              darkMode ? "dark" : ""
                            }`}
                          >
                            Full Stack Web Developer
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div
                    className={`feedPage-layout--sidebar-groupAndChannel ${
                      darkMode ? "dark" : ""
                    }`}
                  >
                    <div>
                      <Link to="/groups">Groups</Link>
                      <br />
                      <Link to="#">Events</Link>
                      <br />
                      <Link to="#">Followed Hashtags</Link>
                      <br />
                    </div>
                    <p>Discover more</p>
                  </div>

                  {/* Groups */}
                  <div
                    className={`feedPage-layout--sidebar-groupAndChannel ${
                      darkMode ? "dark" : ""
                    }`}
                  >
                    <div></div>
                  </div>
                </div>

                {/* main */}
                <div className="feedPage-layout--main">
                  {/* create post */}
                  <div
                    className={`feedPage-main--box ${darkMode ? "dark" : ""}`}
                  >
                    <div className="single-group-cover-image">
                      {group?.image ? (
                        <img src={group?.image} alt="" />
                      ) : (
                        <img
                          src="https://static.licdn.com/aero-v1/sc/h/5v7kdqzhyyiogppftp4sj6sa0"
                          alt=""
                        />
                      )}
                    </div>
                    <div
                      className={`single-group-details ${
                        darkMode ? "dark" : ""
                      }`}
                    >
                      <p>{group?.name}</p>
                      {groups.find((item) => {
                        return item._id === group?._id;
                      }) ? (
                        <div>
                          <button onClick={leaveGroup}>leave</button>
                          <span onClick={() => setShowPostModal(true)}>
                            Create post
                          </span>
                        </div>
                      ) : (
                        <div>
                          <button onClick={addToMyGroups}>Join</button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className={`feedPage-main--box ${darkMode ? "dark" : ""}`}
                  >
                    <div
                      className={`single-group-about ${darkMode ? "dark" : ""}`}
                    >
                      <p>About this group</p>
                      <div>
                        <p>{group?.description}</p>
                        <p>Get connected - Stay updated!</p>
                      </div>
                    </div>
                  </div>

                  <div className="group-posts-container">
                    {groupPosts.length > 0 ? (
                      <>
                        {groupPosts.map((post, index) => (
                          <SinglePost
                            key={index}
                            post={post}
                            index={index}
                            group={group}
                          />
                        ))}
                      </>
                    ) : (
                      <div
                        className={`feedPage-main--box ${
                          darkMode ? "dark" : ""
                        }`}
                      >
                        <div
                          className={`group-no-post-found ${
                            darkMode ? "dark" : ""
                          }`}
                        >
                          This group has no post yet!
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* aside */}
                <div className="feedPage-layout--aside-sg">
                  <div
                    className={`groupPage-common-container ${
                      darkMode ? "dark" : ""
                    }`}
                  >
                    <div
                      className={`group-seggestion-heading-sg ${
                        darkMode ? "dark" : ""
                      }`}
                    >
                      <span>Groups you might be interested in</span>
                      <div className="suggested-groups-container-sg">
                        {suggestedGroups.map((item, index) => (
                          <SuggestedGroupCard
                            key={index}
                            item={item}
                            groups={groups}
                            setGroups={setGroups}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`feedPage-layout--aside-social-connect-container-sg ${
                      darkMode ? "dark" : ""
                    }`}
                  >
                    <div
                      className={`feedPage-layout--aside-social-connect-sg ${
                        darkMode ? "dark" : ""
                      }`}
                    >
                      <p>Ad</p>
                      <div>
                        <img
                          src={`https://ui-avatars.com/api/?name=${name.slice(
                            0,
                            1
                          )}&background=random`}
                          alt=""
                        />
                        <img
                          src={
                            "https://media.licdn.com/dms/image/D4D03AQEAGKpE3guIKA/profile-displayphoto-shrink_100_100/0/1682748449835?e=1708560000&v=beta&t=H1ZWtqL-UCoh3C8c0DmzTCpKuaAudZl1Pjg71WVnjQk"
                          }
                          alt=""
                        />
                      </div>
                      <p>
                        {name}, connect with <span>Alok</span>
                      </p>
                      <a
                        href="https://www.linkedin.com/in/alok-shaw-b57a7426a/"
                        target="_blank"
                      >
                        Connect
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showPostModal && (
            <CreatePostModal
              group={group}
              setShowPostModal={setShowPostModal}
              getPosts={getGroupPosts}
            />
          )}
        </>
      </>
    )
  );
}

export default SingleGroup;

const SinglePost = ({ post, group }) => {
  if (!post) {
    return;
  }
  const { darkMode } = useDarkMode();
  const contentContainerRef = useRef();
  const [showSeeMore, setShowSeeMore] = useState(false);
  const [fitContent, setFitContent] = useState(post.images?.[0] ? false : true);
  function handleContentHeight(e) {
    setShowSeeMore(false);
    setFitContent(true);
  }
  useEffect(() => {
    if (
      contentContainerRef.current.scrollHeight >
      contentContainerRef.current.clientHeight
    ) {
      setShowSeeMore(true);
    }
  }, []);
  return (
    <div className={`feedPage-main--box ${darkMode ? "dark" : ""}`}>
      <div className="feedPage-main-post">
        <div
          className={`feedPgae-main-post--imageAndName-container ${
            darkMode ? "dark" : ""
          }`}
        >
          {/* <img src={post.author.profileImage} alt="" /> */}
          {group.image ? (
            <img src={group.image} alt="" />
          ) : (
            <img
              src="https://static.licdn.com/aero-v1/sc/h/5v7kdqzhyyiogppftp4sj6sa0"
              alt=""
            />
          )}
          <div>
            <p style={{ textTransform: "capitalize" }}>{group.name}</p>
            {/* <span>{post.channel.name}</span> */}
            <span>{post.title}</span>
          </div>
        </div>

        <div
          className={`feedPgae-main-post--content-container ${
            fitContent ? "feedPgae-main-post--content-container-fit-height" : ""
          }`}
          ref={contentContainerRef}
        >
          <span
            className={`feedPgae-main-post--content ${darkMode ? "dark" : ""}`}
          >
            {post.content}
          </span>
          {showSeeMore && (
            <span
              className={`content-see-more ${darkMode ? "dark" : ""}`}
              onClick={handleContentHeight}
            >
              ...see more
            </span>
          )}
        </div>

        {post.images?.[0] && (
          <img
            className="feedPgae-main-post--content-image"
            src={post.images[0]}
            alt=""
          />
        )}
      </div>
    </div>
  );
};

function CreatePostModal({ setShowPostModal, getPosts, group }) {
  const { darkMode } = useDarkMode();
  const [content, setContent] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const { userName: name } = userDetails();
  // const name = "Rahul";

  const contentEditableRef = useRef(null);
  const imagePreviewRef = useRef(null);

  const handleContentChange = (e) => {
    const content = contentEditableRef.current.innerHTML;
    setContent(content);

    const imgRegex = /<img.*?src=["'](.*?)["'].*?>/g;
    const matches = content.match(imgRegex);

    if (matches) {
      const imageSrc = matches[0].match(/src=["'](.*?)["']/)[1];
      contentEditableRef.current.textContent = content.replace(imgRegex, "");

      setImageSrc(imageSrc);
    }
  };

  function handleFileInput(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImageSrc("");
    }
    reader.onloadend = function () {
      setImageSrc(reader.result);
    };
  }
  function handleCreatePost(e) {
    createPostInChannel(
      "Tech in Education: The Digital Classroom",
      contentEditableRef.current.textContent,
      imagePreviewRef,
      setShowPostModal,
      getPosts
    );
  }
  async function createPostInChannel(
    postTitle,
    postContent,
    imagePreviewRef,
    setShowPostModal,
    getPosts
  ) {
    try {
      const token = LocalStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", postTitle);
      formData.append("content", postContent);
      formData.append("channel", group._id);

      if (imagePreviewRef.current?.src) {
        const imgResponse = await fetch(imagePreviewRef.current.src);
        const blob = await imgResponse.blob();
        formData.append("images", blob, "image.jpg");
      }

      const response = await axios.post(
        "https://academics.newtonschool.co/api/v1/linkedin/post",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "ba3mq1ynqg62",
          },
        }
      );
      const send = response.data.data._id;
      console.log(response.data.data);
      if (send) {
        getPosts(group._id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowPostModal(false);
    }
  }
  return (
    <>
      {createPortal(
        <div
          onClick={() => {
            setShowPostModal(false);
          }}
          className="create-post-modal-container"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={`create-post-modal ${darkMode ? "dark" : ""}`}
          >
            <button
              onClick={() => {
                setShowPostModal(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                id="close-medium"
                aria-hidden="true"
                role="none"
                data-supported-dps="24x24"
                fill="currentColor"
              >
                <path d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z"></path>
              </svg>
            </button>

            <div className="create-post-modal-share-box-sg">
              <div
                className={`create-post-modal-share-box-header-sg ${
                  darkMode ? "dark" : ""
                }`}
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${name.slice(
                    0,
                    1
                  )}&background=random`}
                  alt=""
                />
                <div>
                  <span>{name}</span>
                  <span>Post to {group.name}</span>
                </div>
              </div>

              <div className="create-post-modal-share-box-content-container-sg">
                <div className="create-post-modal-share-box-content-sg">
                  <div
                    className={`ql-editor ql-blank ${darkMode ? "dark" : ""}`}
                    data-gramm="false"
                    contentEditable="true"
                    data-placeholder={`${
                      content ? "" : "What do you want to talk about?"
                    }`}
                    aria-placeholder="What do you want to talk about?"
                    aria-label="Text editor for creating content"
                    role="textbox"
                    aria-multiline="true"
                    data-test-ql-editor-contenteditable="true"
                    ref={contentEditableRef}
                    onInput={handleContentChange}
                  ></div>

                  {imageSrc && (
                    <div
                      className={`ql-image-container ${darkMode ? "dark" : ""}`}
                    >
                      <button
                        onClick={() => {
                          setImageSrc("");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          id="close-medium"
                          aria-hidden="true"
                          role="none"
                          data-supported-dps="24x24"
                          fill="currentColor"
                        >
                          <path d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z"></path>
                        </svg>
                      </button>
                      <div>
                        <img ref={imagePreviewRef} src={imageSrc} />
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className={`create-post-modal-share-box-content-post-sg ${
                    darkMode ? "dark" : ""
                  }`}
                >
                  <div>
                    <label htmlFor="file-input">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        id="image-medium"
                        aria-hidden="true"
                        role="none"
                        data-supported-dps="24x24"
                        fill="currentColor"
                      >
                        <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
                      </svg>
                    </label>
                    <input
                      onInput={handleFileInput}
                      type="file"
                      id="file-input"
                    />
                  </div>

                  <div>
                    <button
                      onClick={handleCreatePost}
                      className={`${content || imageSrc ? "active" : ""}`}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
