import React, { useState } from "react";
import axios from "../../axios/axios";
import { useHistory } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/register", { username, password })
      .then((res) => {
        if (res.data.status === "ok") {
          history.push("/login");
        } else {
          alert("Please Dn't Use same Name again or Fill all fileds");
        }
      })
      .catch((error) => console.log("error", error));
    setUsername("");
    setPassword("");
  };
  return (
    <div>
      <h1>Registration </h1>
      <form onSubmit={handleSubmit}>
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

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
