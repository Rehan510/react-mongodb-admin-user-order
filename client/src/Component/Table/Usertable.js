import React, { useState, useEffect } from "react";
import CreateUser from "./CreateUser";
import CreateOrder from "./CreateOrder";
import { Modal, Button } from "react-bootstrap";
import axios from "../../axios/axios";
import { useHistory } from "react-router-dom";

function Usertable(props) {
  let userData = [];
  let orderData = [];
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const [c, setC] = useState(false);
  const history = useHistory();
  const [order, setOrder] = useState(orderData);
  const [user, setUser] = useState(userData);
  const [searchText, setSearchText] = useState("");
  const [item, setIttem] = useState("");
  const [loading, setLoading] = useState(false);
  const [landing, setLanding] = useState(false);
  const [show, setShow] = useState(false);
  const [userid, setUserid] = useState("");
  const adminid = props.location.state.admin;
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.post(`api/userid?page=${pageNumber}`, {
        adminid: adminid,
      });

      setUser(res.data.message);
      setNumberOfPages(res.data.totalPages);
    };
    fetchdata();
  }, [loading, pageNumber]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    }
  }, [a, b, c]);

  const loadinghandler = () => {
    setLoading(false);
  };
  const loadinghandlerr = () => {
    setLanding(false);
  };
  const addOrder = (data) => {
    setLanding(true);
    setUserid(data);
  };
  const ViewOrder = async (user_id) => {
    setShow(true);
    const res = await axios.post("api/orderid", { user_id: user_id }); //ordertable
    setOrder(res.data.message);
    setB(true);
  };
  const handleClose = () => setShow(false);
  const logout = () => {
    localStorage.removeItem("token");
    setA(true);
  };
  const addItem = () => {
    setC(true);
    const res = axios.post("api/item", {
      item: item,
    });

    if (item !== "") {
      alert("Your Item is Add");
      setIttem("");
    } else {
      alert("Your item is not Add");
    }
  };

  const goBack = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };
  const goNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  return (
    <div>
      <button
        style={{ marginRight: "475px" }}
        onClick={() => {
          addItem();
        }}
      >
        Add Item
      </button>
      <br></br>
      <input
        style={{ marginLeft: "200px" }}
        type="text"
        placeholder="addItem"
        value={item}
        onChange={(e) => {
          setIttem(e.target.value);
        }}
      />
      <input
        style={{ marginRight: "100px" }}
        placeholder="Search"
        type="search"
        onChange={(event) => setSearchText(event.target.value)}
      />
      <button style={{ marginRight: "200px" }} onClick={() => setLoading(true)}>
        CreateUser
      </button>
      <h3>{pageNumber + 1}</h3>
      <button
        onClick={() => {
          goBack();
        }}
      >
        Previous
      </button>
      {pages.map((pageIndex) => {
        return (
          <button
            onClick={() => {
              setPageNumber(pageIndex);
            }}
          >
            {pageIndex + 1}
          </button>
        );
      })}
      <button
        onClick={() => {
          goNext();
        }}
      >
        Next
      </button>
      <table border="4" style={{ marginLeft: 400 }}>
        <tr>
          <th>UserID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Education</th>

          <th>Add Order</th>
          <th>ViewOrder</th>
        </tr>
        {user
          .filter((data) =>
            data.name.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((data, index) => {
            return (
              <tr key={index}>
                <td>{data._id}</td>
                <td>{data.name}</td>
                <td>{data.age}</td>
                <td>{data.education}</td>
                <td>
                  <button
                    onClick={() => {
                      addOrder(data._id);
                    }}
                  >
                    Add Order
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      ViewOrder(data._id);
                    }}
                  >
                    ViewOrder
                  </button>
                </td>
              </tr>
            );
          })}
      </table>

      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      {loading ? (
        <CreateUser
          model={true}
          clicked={loadinghandler}
          activeAdmin={adminid}
        />
      ) : null}
      {landing ? (
        <CreateOrder model={true} clicked={loadinghandlerr} uid={userid} />
      ) : null}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>OrderDetail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {order.length > 0 ? (
            <table border="1">
              <tr>
                <th>item</th>
                <th>date</th>
              </tr>

              {order.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.item}</td>
                    <td>{data.date}</td>
                  </tr>
                );
              })}
            </table>
          ) : (
            <span>User Has Not Order Yet</span>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Usertable;
