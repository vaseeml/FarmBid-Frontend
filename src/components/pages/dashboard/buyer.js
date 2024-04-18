import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const Buyer = () => {
  const [show, setShow] = useState(false);
  const [number, setNumber] = useState("");
  const [data, setData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3000/api/wallet", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    setData(response.data);
  }

  const handleSubmit = async (e) => {
    try {
      const formData = {
        walletId: "661e1af3ab4289a363bdfa59",
        amount: number,
      };
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:3000/api/create-checkout-session",
        formData
      );
      console.log("submitted", response.data);
      window.location = response.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Welcome Buyer</h2>
      <h4>Balance is: {data.balance}</h4>
      <Button variant="primary" onClick={handleShow}>
        Recharge Wallet
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="walletAmount">
              <Form.Label>Enter Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Buyer;
