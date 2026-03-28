import plant from "../assets/plant.png";
import leftArrow from "../assets/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DisplayModal from "./DisplayModal";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const nav = useNavigate();
  const [modalMsg, setModalMsg] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (username === "") return;
    else {
      localStorage.setItem("username", username);
    }
  }, [username]);

  const login_fn = async () => {
    let res = "";
    const params = new URLSearchParams({
      username: username,
      password: password,
    });

    try {
      res = await axios({
        method: "post",
        url: "https://sengzulu.gentlehill-6b9262ed.australiaeast.azurecontainerapps.io/login/",
        data: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (res.status === 200) {
        nav("/loadingPage");
      } else {
        setModalMsg("Something went wrong. Please try again ☹️");
        setModalTitle("⚠ Woops");
      }
    } catch (e) {
      if (e.response.data.detail.msg !== undefined) {
        setModalMsg(e.response.data.detail[0].msg);
        setModalTitle("⚠ Woops");
      } else if (e.response.data.detail !== undefined) {
        setModalMsg(e.response.data.detail);
        setModalTitle("⚠ Woops");
      }
    }
  };

  return (
    <div className="flex flex-row w-screen">
      <div className="flex flex-col bg-light-green items-center justify-center w-1/3">
        <div className="flex flex-row justify-start items-start w-full ">
          <img
            src={leftArrow}
            alt="arrow-icon"
            className="m-4 size-10"
            onClick={() => nav("/")}
          />
        </div>
        <div className="flex flex-col flex-1 justify-center p-5 mb-5">
          <img src={plant} alt="plant-icon" className="size-60 mb-[70px]" />
        </div>
      </div>
      <div className="bg-medium-green min-h-screen w-2/3">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">
                Login to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block text-lg font-medium text-gray-900"
                  >
                    Username:
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Username"
                      required
                      autoComplete="username"
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base 
                                text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                                focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-lg font-medium text-gray-900"
                    >
                      Password:
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Password"
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1
                                outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black
                                sm:text-sm/6"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-dark-green px-3 py-1.5 text-sm/6
                                        font-semibold text-white shadow-xs hover:bg-black focus-visible:outline-2 
                                        focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={() => login_fn()}
                  >
                    Login
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-md text-gray-600">
                Don't have an account?
                <a
                  href="/sign-up"
                  className="font-semibold text-dark-green hover:underline hover: decoration-2"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <DisplayModal
        modalMsg={modalMsg}
        show={modalMsg !== ""}
        setModalMsg={setModalMsg}
        modalTitle={modalTitle}
      />
    </div>
  );
}
