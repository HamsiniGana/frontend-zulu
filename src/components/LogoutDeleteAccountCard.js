import Dropdown from "react-bootstrap/Dropdown";
import account from "../assets/account.png";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogoutDeleteAccountCard() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMsg, setModalMsg] = useState("");
  const [modalFn, setModalFn] = useState(null);
  const nav = useNavigate(null);

  const logoutFn = async () => {
    const username = localStorage.getItem("username");
    localStorage.removeItem("username");

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

  const deleteAccountFn = async () => {
    const res = await axios({
      method: "delete",
      url: `https://sengzulu.gentlehill-6b9262ed.australiaeast.azurecontainerapps.io/delete-user/${localStorage.getItem("username")}`,
    });

    if (res.status === 200) {
      nav("/login");
    }
    // console.log(res)
    localStorage.removeItem("username");
    localStorage.removeItem("plants");
    localStorage.removeItem("plantsInfo");
  };

  return (
    <>
      <Dropdown className="flex flex-col items-center justify-center">
        <Dropdown.Toggle
          style={{
            backgroundColor: "rgb(0,0,0, 0.1)",
            borderColor: "rgb(0,0,0, 0.1)",
            backdropFilter: "blur(72px)"

          }}
          id="dropdown-basic"
          className="no-arrow"
        >
          <img src={account} alt="profile-icon" width={60} className="my-2" />
        </Dropdown.Toggle>

        <Dropdown.Menu className="border border-solid border-black">
          <div className="flex flex-col gap-1 items-center m-2">
            <Button
              style={{
                backgroundColor: "var(--medium-green)",
                borderColor: "var(--medium-green)",
                margin: "3px",
                color: "black",
                width: "150px",
              }}
              onClick={() => {
                setShowLogoutModal(true);
                setModalTitle("Logout request");
                setModalMsg("Are you sure you want to logout?");
                setModalFn(() => logoutFn);
              }}
            >
              Logout
            </Button>
            <Button
              style={{
                backgroundColor: "var(--dark-green)",
                borderColor: "var(--dark-green)",
                margin: "3px",
                width: "150px",
              }}
              onClick={() => {
                setShowLogoutModal(true);
                setModalTitle("Account deletion request");
                setModalMsg("Are you sure you want to delete your account?");
                setModalFn(() => deleteAccountFn);
              }}
            >
              Delete account
            </Button>
          </div>
        </Dropdown.Menu>
      </Dropdown>
      {showLogoutModal && (
        <ConfirmModal
          showLogoutModal={showLogoutModal}
          setShowLogoutModal={setShowLogoutModal}
          title={modalTitle}
          msg={modalMsg}
          fnPassed={modalFn}
        />
      )}
    </>
  );
}
