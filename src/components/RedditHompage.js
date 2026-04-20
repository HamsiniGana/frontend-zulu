import plantBg from "../assets/bg-img.avif";
import RedditNavbar from "./RedditNavbar";
import search from "../assets/searchPosts.png";
import { useNavigate } from "react-router-dom";

export default function RedditHomepage() {
  const nav = useNavigate();
  return (
    <div
      className="flex flex-col"
      style={{
        backgroundImage: `url(${plantBg})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <RedditNavbar />
      <div className=" min-h-screen flex flex-col">
        <div className="flex flex-row justify-center items-center">
          <div
            className="flex flex-col bg-white/30 mx-5 px-3 py-5 items-center
                        rounded-3xl
                        hover:scale-[1.01] mt-[10vh] border border-solid border-white"
            style={{ backdropFilter: "blur(10px)" }}
          >
            {/* <div className="flex flex-col w-full items-center"> */}
            <img src={search} alt="search-icon" style={{ width: "200px" }} />
            <h4>Search posts</h4>
            <p>Find relevant Reddit discussions.</p>
            <button
              className="hover:bg-white hover:!text-black py-2 px-3 rounded-xl w-[150px] hover:border hover:border-solid hover:border-black
              bg-dark-bottle-green text-white text-md mb-2 mr-3 mt-2 w-[30vw]"
              onClick={() => nav("/homepage/reddit-homepage/search-posts")}
            >
              Get started
            </button>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
