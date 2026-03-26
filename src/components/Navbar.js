import plantLight from "../assets/plantLight.png";
import { useNavigate } from "react-router-dom";
import LogoutDeleteAccountCard from "./LogoutDeleteAccountCard";

export default function Navbar() {
  const nav = useNavigate();
  return (
    <div
      className="flex flex-row bg-dark-bottle-green/70 items-center"
      style={{ backdropFilter: "blur(12px)", "zIndex": "999", position: "relative" }}
    >
      <div>
        <img
          src={plantLight}
          alt="plant-icon"
          className="w-20 h-20 p-2"
          onClick={() => nav("/homepage")}
        />
      </div>
      <div
        className="flex flex-row gap-[60px] flex-1 justify-start
                            mr-[60px] text-black text-xl ml-[40px]"
      >
        <p
          className="hover:bg-white hover:decoration-2 bg-medium-green p-3 rounded-xl"
          onClick={() => nav("/homepage/data")}
        >
          Data
        </p>
        <p className="hover:bg-white hover:decoration-2 bg-medium-green p-3 rounded-xl">
          Graphs
        </p>
        <p className="hover:bg-white hover:decoration-2 bg-medium-green p-3 rounded-xl">
          Reports
        </p>
      </div>
      <LogoutDeleteAccountCard className="justify-end" />
    </div>
  );
}
