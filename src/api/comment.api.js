export const getComments = async (postId) => {
  try {
    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/linkedin/post/${postId}/comments`,
      {
        method: "GET",
        headers: {
          projectid: "i1dieevrt9g1",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteCommentAPI = async (commentId) => {
  try {
    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/linkedin/comment/${commentId}`,
      {
        method: "DELETE",
        headers: {
          projectid: "i1dieevrt9g1",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
