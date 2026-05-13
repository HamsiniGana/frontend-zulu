import { useEffect, useState } from "react";
import bgImg from "../assets/bg-img.avif";
import Navbar from "./Navbar";
import axios from "axios";

export default function SoilTypes() {
  const [soils, setSoils] = useState([]);

  useEffect(() => {
    const getSoilListFn = async () => {
      const res = await axios({
        method: "get",
        url: `http://localhost:8000/soil`,
      });
      console.log(res.data);
      setSoils(res.data);
    };

    getSoilListFn();
  }, [soils.length]);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
      }}
      className="flex flex-col items-center"
    >
      <div className="w-full">
        <Navbar />
      </div>

      <div
        className="bg-white/10 h-[80vh] w-[50vw] flex flex-col mt-4 mb-5 mx-4 rounded-2xl items-center justify-center border border-solid border-white"
        style={{ backdropFilter: "blur(5px)" }}
        data-testid={"data-container"}
      >
        <div className="flex flex-col">
          <h3 className="text-white my-3 text-center">Soil types:</h3>
          <hr className="text-white"/>
          {soils.length > 0 && (
            <ul>
              {soils.map((soil, index) => {
                return <li className="text-white">- {soil}</li>;
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
