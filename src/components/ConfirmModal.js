import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export default function ConfirmModal(props) {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const logout_fn = async() => {
        // fetch usernmae from locaStorage to logout
        // when user logs in store username in localStorage
    }

    useEffect(() => {
        setShow(props.showLogoutModal)
    }, [props.showLogoutModal])

    return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton onClick={() => props.setShowLogoutModal(false)}>
          <Modal.Title>Logout request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to logout?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setShowLogoutModal(false)}
          style={{backgroundColor: "var(--medium-green)", borderColor: "var(--medium-green)"}}
          className='text-black'>
            Cancel
          </Button>
          <Button style={{backgroundColor: "var(--dark-green)", borderColor: "var(--dark-green)"}}
          onClick={()=>props.setShowLogoutModal(false)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}