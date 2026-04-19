import reddit from "../assets/reddit.png";
import leftArrow from "../assets/arrow-left.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DisplayModal from "./DisplayModal";
import { useState } from "react";

export default function RedditLoginPage() {
  const nav = useNavigate();
  const [modalMsg, setModalMsg] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  //   useEffect(() => {
  //     if (username === "") return;
  //     else {
  //       localStorage.setItem("username", username);
  //     }
  //   }, [username]);

  const login_fn = async () => {
    let res = "";
    console.log("email ", email)
    try {
      res = await axios({
        method: "post",
        url: "https://215fbbb9u9.execute-api.us-east-1.amazonaws.com/v1/auth/login",
        data: {
          email: email,
          password: password,
        },
      });

      if (res.status === 200) {
        nav("/homepage/reddit-homepage");
        localStorage.setItem("reddit-token", res.data.token)
        console.log(res);
      } else {
        setModalMsg("Something went wrong. Please try again ☹️");
        setModalTitle("⚠ Woops");
      }
    } catch (e) {
        setModalMsg(e.response.data.error);
        setModalTitle("⚠ Woops");
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
            onClick={() => nav("/homepage")}
          />
        </div>
        <div className="flex flex-col flex-1 justify-center p-5 mb-5">
          <img src={reddit} alt="plant-icon" className="size-60 mb-[70px]" />
        </div>
      </div>
      <div className="bg-medium-green min-h-screen w-2/3">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h3 className="mt-10 text-center text-3xl font-bold tracking-tight text-gray-900">
                Login to your third party account
              </h3>
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
                    htmlFor="email"
                    className="block text-lg font-medium text-gray-900"
                  >
                    Email address:
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="Email"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base 
                                text-gray-900 outline-1 -outline-offset-1 outline-gray-300 
                                placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 
                                focus:outline-black sm:text-sm/6"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
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

              <div className="flex flex-row justify-center">
                <p className="mt-10 text-center text-md text-gray-600">
                  Don't have an account?
                </p>
                <p
                  onClick={() => nav("/homepage/reddit-sign-up")}
                  className="mt-10 font-semibold text-dark-green hover:underline hover: decoration-2"
                >
                  Sign up
                </p>
              </div>
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
