import Navbar from "./Navbar";
import bgImg from "../assets/bg-img.avif";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
import comparePlants from "../assets/comparePlants.png"
import irrigation from "../assets/irrigation.png"
import listPlants from "../assets/listPlants.png"
import soil from "../assets/soil.png"
import search from "../assets/search.png"
import DataLandingPageCards from "./DataLandingPageCards";

export default function DataLandingPage() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Navbar />
      <div
        className="bg-white/10 h-[80vh] flex flex-col mt-4 mb-5 mx-4 rounded-2xl items-center justify-between border border-solid border-white"
        style={{ backdropFilter: "blur(5px)"}}
        data-testid={"data-container"}
      >
        <h1 className="text-white mb-2">Data</h1>
        <div className="flex flex-row gap-3 justify-between mx-2">

        <DataLandingPageCards img={soil} alt={"soil-icon"} title={"Soil types"} description={"Get a list of all soil types."} navLink={'/homepage/data/soil-types'}/>
        <DataLandingPageCards img={irrigation} alt={"irrigation-icon"} title={"Irrigation guide"} description={"Get information on how and when to water your plants, and how weather affects it."} navLink={'/homepage/data/irrigation-guide'}/>
        <DataLandingPageCards img={search} alt={"search-icon"} title={"Search plants"} description={"Search for plants by providing some attributes."} navLink={'/homepage/data/search-plant'}/>
        <DataLandingPageCards img={listPlants} alt={"plant-information-icon"} title={"Plant information"} description={"Get detailed information about a plant."} navLink={'/homepage/data/plant-info'}/>
        <DataLandingPageCards img={comparePlants} alt={"compare-plants-icon"} title={"Compare plants"} description={"Compare plant information and understand how they differ."} navLink={'/homepage/data/compare-plants'}/>
        </div>
      </div>
    </div>
  );
}
