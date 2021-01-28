import React from "react";
import { useHistory } from "react-router-dom";
function FirstPage() {
  const history = useHistory();

  const Register = () => {
    history.push("/register");
  };
  const Login = () => {
    history.push("/login");
  };
  return (
    <div>
      <h2>Well Come To ExpertsCloud</h2>
      <button
        style={{ marginRight: "" }}
        onClick={() => {
          Register();
        }}
      >
        Register
      </button>
      OR
      <button
        style={{ marginRight: "20px" }}
        onClick={() => {
          Login();
        }}
      >
        Login
      </button>
    </div>
  );
}

export default FirstPage;
