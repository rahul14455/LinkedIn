import axios from "axios";

export default async function getSingleGroup(id, setGroups) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://academics.newtonschool.co/api/v1/linkedIn/channel/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          projectid: "i1dieevrt9g1",
        },
      }
    );
    const myGroups = localStorage.getItem("linkedin-myGroups");
    if (myGroups) {
      let parsedMyGroups = JSON.parse(myGroups);
      parsedMyGroups = [...parsedMyGroups, response.data.data];
      localStorage.setItem("linkedin-myGroups", JSON.stringify(parsedMyGroups));
    } else {
      localStorage.setItem(
        "linkedin-myGroups",
        JSON.stringify([response.data.data])
      );
    }
    setGroups((prev) => {
      return JSON.parse(localStorage.getItem("linkedin-myGroups"));
    });
  } catch (error) {
    console.log(error);
  }
}
