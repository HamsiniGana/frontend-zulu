import Navbar from "./Navbar";
import bgImg from "../assets/bg-img.avif";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import comparePlants from "../assets/comparePlants.png"
import irrigation from "../assets/irrigation.png"
import listPlants from "../assets/listPlants.png"
import { useNavigate } from "react-router-dom";
export default function DataLandingPage() {
    const nav = useNavigate()
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
        className="bg-white/10 h-[83vh] flex flex-col mt-4 mb-5 mx-4 rounded-2xl items-center justify-center border border-solid border-white"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <h1 className="text-white mb-5">Data</h1>
        <div className="flex flex-row gap-5 justify-between">
          <Card style={{ width: "18rem", background: "rgba(158, 237, 136, 0.3)", backdropFilter: "blur(5px)"}} className="">
            <Card.Img variant="top" src={irrigation} alt="irrigation-icon" className="p-3"/>
            <Card.Body>
              <Card.Title className="text-white">Irrigation guide</Card.Title>
              <Card.Text className="font-bold h-[10vh]">
                Get information on how and when to water your plants, and how weather affects it.
              </Card.Text>
              <Button className="hover:!text-black hover:!bg-white" style={{backgroundColor: "var(--dark-bottle-green)", borderColor:"var(--dark-bottle-green)", borderWidth:"2px"}}
              onClick={()=> nav('/homepage/data/irrigation-guide')}>Get started</Button>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem", background: "rgba(158, 237, 136, 0.3)", backdropFilter: "blur(5px)"}} className="">
            <Card.Img variant="top" src={listPlants} alt="plant-information-icon" className="p-3"/>
            <Card.Body>
              <Card.Title className="text-white">Plant information</Card.Title>
              <Card.Text className="font-bold h-[10vh]">
                Get detailed information about a plant.
              </Card.Text>
              <Button className="hover:!text-black hover:!bg-white" style={{backgroundColor: "var(--dark-bottle-green)", borderColor:"var(--dark-bottle-green)", borderWidth:"2px"}}
              onClick={()=> nav('/homepage/data/plant-info')}>Get started</Button>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem", background: "rgba(158, 237, 136, 0.3)", backdropFilter: "blur(5px)"}} className="">
            <Card.Img variant="top" src={comparePlants} alt="compare-plants-icon" className="p-3"/>
            <Card.Body>
              <Card.Title className="text-white">Compare plants</Card.Title>
              <Card.Text className="font-bold h-[10vh]">
                Compare plant information and understand how they differ.
              </Card.Text>
              <Button className="hover:!text-black hover:!bg-white" style={{backgroundColor: "var(--dark-bottle-green)", borderColor:"var(--dark-bottle-green)", borderWidth:"2px"}}
              onClick={()=> nav('/homepage/data/compare-plants')}>Get started</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
