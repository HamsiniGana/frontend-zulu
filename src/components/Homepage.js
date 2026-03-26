import rain from "../assets/rain.png";
import sappling from "../assets/sappling.png";
import graph from "../assets/graph.png";
import Navbar from "./Navbar";
import report from "../assets/report.png";
import { useNavigate } from "react-router-dom";
import plantBg from "../assets/bg-img.avif";

export default function Homepage() {
  const nav = useNavigate();
  return (
    <div
      className="flex flex-col"
      style={{
        backgroundImage: `url(${plantBg})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      <div className=" min-h-screen flex flex-col">
        <div
          className="flex flex-row gap-[20vw] bg-white/30 mx-5 p-5 items-center justify-center
                        rounded-3xl
                        hover:scale-[1.01] h-[40vh] mt-[5vh] border border-solid border-white"
          style={{ backdropFilter: "blur(10px)" }}
        >
          <div className="flex flex-col gap-2 h-full items-center justify-center mb-2">
            <img src={rain} alt="rain-icon" className="w-[80px] h-[80px]" />
            <img
              src={sappling}
              alt="sappling-icon"
              className="w-[70px] h-[70px]"
              color="white"
            />
          </div>

          <div className="flex flex-col flex-1 h-full">
            <div className="flex flex-col flex-1 justify-center">
              <h1 className="text-black font-bold text-2xl pb-5">
                Data
              </h1>
              <p className="text-xl text-black">
                Upload or use existing datasets to analyse plant data in
                relation to weather data.
              </p>
            </div>
            <div className="flex flex-row justify-end mr-1">
              <button
                className="hover:bg-white hover:!text-black py-2 px-3 rounded-xl w-[150px] hover:border hover:border-solid hover:border-black
                bg-dark-bottle-green text-white text-xl"
                onClick={() => nav("/homepage/data")}
              >
                Get started
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center">
          <div
            className="flex flex-col bg-white/30 m-5 p-5
                        rounded-3xl
                        hover:scale-[1.01] w-[49vw]  h-[40vh]
                        border border-solid border-white"
            style={{ backdropFilter: "blur(10px)" }}
          >
            <div className="flex flex-row justify-start w-full">
              <h1 className="text-black font-bold text-2xl">
                Graphs
              </h1>
            </div>

            <div className="flex flex-row gap-5 items-center flex-1 ">
              {/* <div className='flex flex-row items-center h-full  border border-solid border-black'>   */}
              <img
                src={graph}
                alt="graph-icon"
                className="w-[80px] h-[80px] "
              />
              <p className="text-xl pb-5 text-center mt-5 text-black">View data trends.</p>
              {/* </div> */}
            </div>
            <div className="flex flex-row justify-end mr-1">
              <button
                className="hover:bg-white hover:!text-black py-2 px-3 rounded-xl w-[150px] hover:border hover:border-solid hover:border-black
              bg-dark-bottle-green text-white text-xl"
              >
                Get started
              </button>
            </div>
          </div>
          <div
            className="flex flex-col bg-white/30 m-5 p-5
                        rounded-3xl shadow-2xl
                        hover:scale-[1.01] w-[49vw]  h-[40vh] border border-solid border-white"
            style={{ backdropFilter: "blur(10px)" }}
          >
            <div className="flex flex-row justify-start w-full">
              <h1 className="text-black font-bold text-2xl ">
                Reports
              </h1>
            </div>

            <div className="flex flex-row gap-5 items-center flex-1">
              <img
                src={report}
                alt="graph-icon"
                className="w-[80px] h-[80px]"
              />
              <p className="text-xl pb-5 mt-5 text-black">Harvest final intelligence.</p>
            </div>
            <div className="flex flex-row justify-end mr-1">
              <button
                className="hover:bg-white hover:!text-black py-2 px-3 rounded-xl w-[150px] hover:border hover:border-solid hover:border-black
              bg-dark-bottle-green text-white text-xl"
                onClick={() => nav("/homepage/compare-plants")}
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
