import Navbar from "./Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import DisplayModal from "./DisplayModal";
import axios from "axios";
import plantBg from "../assets/bg-img.avif";
import PlantInfoCard from "./PlantInfoCard";

export default function PlantInfo() {
  const [listPlant, setListPlant] = useState(() => {
    return localStorage.getItem("listPlant")
      ? JSON.parse(localStorage.getItem("listPlant"))
      : "";
  });
  const [listPlantInfo, setListPlantInfo] = useState(() => {
    return localStorage.getItem("listPlantInfo")
      ? JSON.parse(localStorage.getItem("listPlantInfo"))
      : {};
  });
  const [modalMsg, setModalMsg] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("listPlant", JSON.stringify(listPlant));
    localStorage.setItem("listPlantInfo", JSON.stringify(listPlantInfo));
    // console.log(listPlant);
    // console.log(listPlantInfo);
  }, [listPlant, listPlantInfo]);

  const infoFn = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `https://sengzulu.gentlehill-6b9262ed.australiaeast.azurecontainerapps.io/plants/${listPlant}`,
      });
      setListPlantInfo(res.data);
    } catch (e) {
      setModalMsg(e.response.data.detail);
      setModalTitle("Woops!");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${plantBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Navbar />
      <div>
        <div
          className="relative flex flex-col items-center bg-white/10 m-4 rounded-2xl h-[85vh] my-3 border border-solid border-white/20"
          style={{ backdropFilter: "blur(10px)" }}
        >
          <div className="flex flex-row items-center gap-[35vw]">
            <h1 className="mt-3 text-white">Plant information</h1>
          </div>

          <div className="flex flex-row justify-between">
            <Form>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search for plant to compare"
                    className=" mt-3"
                    style={{
                      width: "400px",
                      borderColor: "black",
                      borderWidth: "2px",
                    }}
                    onChange={(e) => setListPlant(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        infoFn();
                      }
                    }}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    style={{
                      backgroundColor: "var(--dark-green)",
                      borderColor: "black",
                      marginLeft: "-20px",
                      borderWidth: "2px",
                    }}
                    className="mt-3 hover:!bg-white hover:!text-black hover:border hover:border-solid hover:border-black"
                    onClick={() => infoFn()}
                  >
                    +Add
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>

          <div className="flex flex-row justify-between gap-5 overflow flex-wrap mt-3">
            {Object.keys(listPlantInfo).length !== 0 && (
              <PlantInfoCard
                key={listPlant}
                attributes={listPlantInfo.attributes}
                category={listPlantInfo.category}
                cliz={listPlantInfo.cliz}
                ktmp={listPlantInfo.ktmp}
                ktmpr={listPlantInfo.ktmpr}
                life_form={listPlantInfo.life_form}
                life_span={listPlantInfo.life_span}
                photo={listPlantInfo.photo}
                texture={listPlantInfo.texture}
                plant_name={listPlantInfo.plant_name}
                gmax={listPlantInfo.gmax}
                gmin={listPlantInfo.gmin}
                phmax={listPlantInfo.phmax}
                phmin={listPlantInfo.phmin}
                ropmn={listPlantInfo.ropmn}
                ropmx={listPlantInfo.ropmx}
                topmn={listPlantInfo.topmn}
                topmx={listPlantInfo.topmx}
                setListPlant={setListPlant}
                setListPlantInfo={setListPlantInfo}
              />
            )}
          </div>
        </div>
        <DisplayModal
          modalMsg={modalMsg}
          modalTitle={modalTitle}
          show={modalMsg !== ""}
          setModalMsg={setModalMsg}
        />
      </div>
    </div>
  );
}
