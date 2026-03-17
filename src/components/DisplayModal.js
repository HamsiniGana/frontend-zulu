import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";

export default function DisplayModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          onClick={() => props.setModalMsg("")}
          className="text-2xl"
        >
          {props.modalTitle}
        </Modal.Header>
        <Modal.Body>{props.modalMsg}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            style={{
              backgroundColor: "var(--dark-green)",
              borderColor: "var(--dark-green)",
            }}
            onClick={() => {
              props.setModalMsg("");
              return handleClose;
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
