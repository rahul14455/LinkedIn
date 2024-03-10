import React, { useState } from "react";
import "../CSS/login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    if (!name) {
      return alert("Name is required.");
    }

    if (!email) {
      return alert("Email is required.");
    }

    if (!password) {
      return alert("password is required.");
    }
    //console.log({ name, email, password, appType: "linkedin" });
    try {
      // Replace 'api/login' with your actual login API endpoint
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/signup",
        {
          method: "POST",
          headers: {
            projectID: "ba3mq1ynqg62",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            appType: "linkedin",
          }),
        }
      );
      const data = await response.json();
      console.log(data); // Handle response data
      const token = data.token;
      // Store token in localStorage
      localStorage.setItem("token", token);

      // Redirect to dashboard or another page upon successful login
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          name: data.data.name,
          email: data.data.email,
          id: data.data._id,
        })
      );
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const loginfunction = async (e) => {
    e.preventDefault();

    if (!email) {
      return alert("Email is required.");
    }

    if (!password) {
      return alert("password is required.");
    }
    //console.log({ name, email, password, appType: "linkedin" });

    try {
      // Replace 'api/login' with your actual login API endpoint
      const response = await fetch(
        "  https://academics.newtonschool.co/api/v1/user/login",
        {
          method: "POST",
          headers: {
            projectID: "ba3mq1ynqg62",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            appType: "linkedin",
          }),
        }
      );
      const data = await response.json();
      console.log(data); // Handle response data
      const token = data.token;
      // Store token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          name: data.data.name,
          email: data.data.email,
          id: data.data._id,
        })
      );

      navigate("/home");

      // Redirect to dashboard or another page upon successful login
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="loginscreen">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1280px-LinkedIn_Logo.svg.png" />
        {signup == true ? (
          <form onSubmit={register}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="Sign Up" />

            <h4>
              Already a member ?{" "}
              <span onClick={(e) => setSignup(false)}>Login Here</span>
            </h4>
          </form>
        ) : (
          <form>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input type="submit" value="Sign In" onClick={loginfunction} />

            <h4>
              Not a member ?{" "}
              <span onClick={(e) => setSignup(true)}>Register Here</span>
            </h4>
          </form>
        )}
      </div>
    </>
  );
}

export default Login;
