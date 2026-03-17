import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ConfirmModal(props) {
  const nav = useNavigate();
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const logout_fn = async () => {
    const username = localStorage.getItem("username");
    localStorage.removeItem("username");
    console.log(username);

    const res = await axios({
      method: "post",
      url: "https://sengzulu.gentlehill-6b9262ed.australiaeast.azurecontainerapps.io/logout/",
      params: {
        username: username,
      },
    });

    if (res.status === 200) {
      nav("/login");
    }
  };

  useEffect(() => {
    setShow(props.showLogoutModal);
  }, [props.showLogoutModal]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          onClick={() => props.setShowLogoutModal(false)}
        >
          <Modal.Title>Logout request</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => props.setShowLogoutModal(false)}
            style={{
              backgroundColor: "var(--medium-green)",
              borderColor: "var(--medium-green)",
            }}
            className="text-black"
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "var(--dark-green)",
              borderColor: "var(--dark-green)",
            }}
            onClick={() => {
              props.setShowLogoutModal(false);
              logout_fn();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
