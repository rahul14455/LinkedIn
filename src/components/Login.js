import React, { useState } from "react";
import "../CSS/login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateName = (name) => {
    return name.length >= 8;
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password) && !password.includes(" ");
  };

  const register = async (e) => {
    e.preventDefault();

    if (!validateName(name)) {
      return alert("Name must be at least 8 characters long.");
    }

    if (!email) {
      return alert("Email is required.");
    }

    if (!validatePassword(password)) {
      return alert(
        "Password must be at least 8 characters, include uppercase, lowercase, digit, special character, and should not contain spaces."
      );
    }

    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/signup",
        {
          method: "POST",
          headers: {
            projectID: "i1dieevrt9g1",
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
      const token = data.token;

      if (data.token && data.data && data.data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userDetails", JSON.stringify(data.data.user));
        navigate("/home");
      } else {
        alert("Signup failed, please check your details and try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed, please check console for details.");
    }
  };

  const loginfunction = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Email is required.");
      return;
    }

    if (!validatePassword(password)) {
      alert(
        "Password must be at least 8 characters, include uppercase, lowercase, digit, special character, and should not contain spaces."
      );
      return;
    }

    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectid: "i1dieevrt9g1",
          },
          body: JSON.stringify({
            email: email,
            password: password,
            appType: "linkedin",
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.token && data.data && data.data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userDetails", JSON.stringify(data.data.user));
        navigate("/home");
      } else {
        alert("Login failed, please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed, please check console for details.");
    }
  };

  return (
    <>
      <div className="loginscreen">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1280px-LinkedIn_Logo.svg.png" />
        {signup ? (
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
              Already a member?{" "}
              <span onClick={() => setSignup(false)}>Login Here</span>
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
              Not a member?{" "}
              <span onClick={() => setSignup(true)}>Register Here</span>
            </h4>
          </form>
        )}
      </div>
    </>
  );
}

export default Login;
