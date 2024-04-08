export const deletePost = async (postId) => {
  try {
    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/linkedIn/post/${postId}`,
      {
        method: "DELETE",
        headers: {
          projectid: "ba3mq1ynqg62",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return { data: "successfully deleted" };
  } catch (error) {
    return error;
    console.error("Error fetching data:", error);
  }
};

export const likeAPost = async (postId) => {
  try {
    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/linkedin/like/${postId}`,
      {
        method: "POST",
        headers: {
          projectid: "ba3mq1ynqg62",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const jsonResponse = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  // setreloadPosts(false);
};
