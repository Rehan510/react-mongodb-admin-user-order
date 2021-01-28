import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "../../axios/axios";
const CreateUser = (props) => {
  const history = useHistory();
  const [show, setShow] = useState(props.model);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [education, setEducation] = useState("");
  const [activeAdmin, setActiveAdmin] = useState(props.activeAdmin);
  const handleClosee = () => {
    props.clicked();
    setShow(false);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    }
  }, []);
  const handleClose = async () => {
    setShow(false);
    try {
      const res = await axios.post("api/user", {
        admin_id: activeAdmin,
        name: name,
        age: age,
        education: education,
      });

      if (res) {
        console.log(name, age, education, res);
        props.clicked();
      }
    } catch (error) {
      alert("Please Fill Information");
      setShow(true);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClosee} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br></br>
          <br></br>
          <input
            type="text"
            placeholder="Age"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
          <br></br>
          <br></br>

          <input
            type="text"
            placeholder="Education"
            value={education}
            onChange={(e) => {
              setEducation(e.target.value);
            }}
          />
          <br></br>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CreateUser;
