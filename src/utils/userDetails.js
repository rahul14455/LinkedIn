const userDetails = () => {
  const userName =
    JSON.parse(localStorage.getItem("userDetails"))?.name || "Rahul";

  return { userName: userName };
};

export default userDetails;
