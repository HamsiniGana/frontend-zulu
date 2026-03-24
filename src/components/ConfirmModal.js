import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ConfirmModal(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(props.showLogoutModal);
  }, [props.showLogoutModal]);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header
          closeButton
          onClick={() => props.setShowLogoutModal(false)}
        >
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.msg}</Modal.Body>
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
              props.fnPassed();
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
