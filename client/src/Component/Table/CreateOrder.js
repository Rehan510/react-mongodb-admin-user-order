import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "../../axios/axios";
const CreateOrder = (props) => {
  let userData = [];
  const history = useHistory();
  const [user, setUser] = useState(userData);
  const [show, setShow] = useState(props.model);
  const [userid, setUserid] = useState(props.uid);
  const [item, setItem] = useState("Mobile");
  var d = new Date();
  var n = d.toLocaleString();

  const handleClosee = () => {
    props.clicked();
    setShow(false);
  };
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("api/item");
      setUser(res.data.response);
    };
    fetchdata();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    }
  }, []);

  const handleClose = async () => {
    setShow(false);
    try {
      const res = await axios.post("api/order", {
        user_id: userid,
        item: item,
        date: n,
      });

      if (res) {
        props.clicked();
      }
    } catch (error) {
      alert("Please Add Item Select YourName");
      setShow(true);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClosee} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Select Your Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select onChange={(e) => setItem(e.target.value)}>
            {user.map((data, index) => {
              return (
                <>
                  <option value={data.item}>{data.item}</option>;
                </>
              );
            })}
          </select>
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
export default CreateOrder;
