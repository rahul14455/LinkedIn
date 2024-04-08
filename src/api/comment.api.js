export const getComments = async (postId) => {
  try {
    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/linkedin/post/${postId}/comments`,
      {
        method: "GET",
        headers: {
          projectid: "ba3mq1ynqg62",
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
