import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../axios/axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [a, setA] = useState("");
  const history = useHistory();
  const Register = () => {
    history.push("/register");
  };

  const submitFunction = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/login", { username, password })
      .then((res) => {
        if (res.data.status === "ok") {
          localStorage.setItem("token", res.data.token, res.data.id);
          setA(res.data.id);

          console.log(res.data.token);
          const token = localStorage.getItem("token");
          if (token && token.length > 1) {
            history.push({
              pathname: "/usertable",
              state: { admin: res.data.id },
            });

            console.log(a);
          } else {
          }
        } else if (res.data.status === "error") {
          alert("invalid UserName Password");
        }
      })
      .catch((error) => console.log("error", error));
    setUsername("");
    setPassword("");
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submitFunction}>
        <label>Name:</label>
        <br></br>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br></br>
        <label>Password</label>
        <br></br>
        <input
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br></br>
        <button type="submit">Login</button>
        <br></br>
      </form>
      <button
        onClick={() => {
          Register();
        }}
      >
        Register
      </button>
    </div>
  );
}
