import Navbar from "./Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import DisplayModal from "./DisplayModal";
import axios from "axios";
import ClosableTabs from "./ClosableTabs";
import plantBg from "../assets/plant-bg.jpg";

export default function ComparePlants() {
  const [plants, setPlants] = useState([]);
  const [newPlant, setNewPlant] = useState("");
  const [plantsInfo, setPlantsInfo] = useState([]);
  const [modalMsg, setModalMsg] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    console.log(plants);
    console.log(plantsInfo);
  }, [plants, plantsInfo]);

  const compareFn = async () => {
    const params = new URLSearchParams();

    for (const p of plants) {
      params.append("plants", p);
    }

    try {
      const res = await axios({
        method: "get",
        url: "https://sengzulu.gentlehill-6b9262ed.australiaeast.azurecontainerapps.io/compare/",
        params: params,
      });
      for (const info of res.data) {
        setPlantsInfo((prev) => {
          const alreadyExists = prev.find(
            (p) => p.plant_name === info.plant_name,
          );
          if (!alreadyExists) {
            return [...prev, info];
          } else {
            return prev.map((item) => {
              if (item.plant_name === info.plant_name) {
                return {
                  ...item,
                  attributes: info.attributes,
                  category: info.category,
                  cliz: info.cliz,
                  gavg: info.gavg,
                  ktmp: info.ktmp,
                  ktmpr: info.ktmpr,
                  life_form: info.life_form,
                  life_span: info.life_span,
                  biennial: info.biennial,
                  phavg: info.phavg,
                  photo: info.photo,
                  plant_name: info.plant_name,
                  ravg: info.ravg,
                  tavg: info.tavg,
                  texture: info.texture,
                };
              } else {
                return item;
              }
            });
          }
        });
      }
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
      }}
      className="bg-light-green min-h-screen"
    >
      <Navbar />
      <div>
        <div className="relative flex flex-col items-center bg-white/50 m-4 rounded-2xl h-[85vh] shadow-xl">
          <div className="flex flex-row m-4 items-center gap-[35vw]">
            <h1 className="mt-3">Compare plants</h1>
          </div>

          <div className="flex flex-row justify-between">
            <Form>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search for plants to compare"
                    className=" mt-3"
                    style={{
                      width: "400px",
                      borderColor: "black",
                      borderWidth: "2px",
                    }}
                    onChange={(e) => setNewPlant(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        setPlants((prev) => {
                          e.preventDefault();
                          const foundPlant = prev.find((p) => p === newPlant);
                          if (!foundPlant && newPlant !== "") {
                            return [...prev, newPlant];
                          } else {
                            return prev;
                          }
                        });
                      }
                    }}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    style={{
                      backgroundColor: "var(--dark-bottle-green)",
                      borderColor: "var(--dark-bottle-green)",
                      marginLeft: "-20px",
                      borderWidth: "2px",
                    }}
                    className="mt-3 hover:!bg-white hover:!text-black hover:border hover:border-solid hover:border-black"
                    onClick={(e) => {
                      return setPlants((prev) => {
                        e.preventDefault();
                        const foundPlant = prev.find((p) => p === newPlant);
                        if (!foundPlant && newPlant !== "") {
                          return [...prev, newPlant];
                        } else {
                          return prev;
                        }
                      });
                    }}
                  >
                    +Add
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>

          <div className="flex flex-row m-4 justify-center">
            {plants.map((plant) => {
              return (
                <ClosableTabs key={plant} plant={plant} setPlants={setPlants} />
              );
            })}
            {plants.length >= 2 && (
              <Button
                style={{
                  backgroundColor: "black",
                  borderColor: "black",
                  borderWidth: "2px",
                }}
                className="flex-2 hover:!bg-white hover:!text-black"
                onClick={() => compareFn()}
              >
                Compare
              </Button>
            )}
          </div>

          {plantsInfo.length >= 2 && (
            <div className="w-[85%] overflow-x-auto my-3 mx-2">
              <div
                // style={{ borderRadius: "50px" }}
                className="flex flex-row min-w-[500px] border-collapse border border-black bg-white"
              >
                {/* <tbody className=""> */}
                {/* <thead style={{ borderRadius: "50px" }}> */}
                  <div className="flex flex-col">
                    <div className="border border-solid border-black px-3 py-2 bg-dark-bottle-green text-white font-bold h-[10vh] text-lg">
                      Plant name
                    </div>
                    <div className="border border-solid border-black px-3 py-2 bg-dark-bottle-green text-white font-bold h-[30vh] text-lg">
                      Attributes
                    </div>
                    <div className="border border-solid border-black px-3 py-2 bg-dark-bottle-green text-white font-bold h-[30vh] text-lg">
                      Category
                    </div>
                    <div className="border border-solid border-black px-3 py-2 bg-dark-bottle-green text-white font-bold h-[30vh] text-lg">
                      Climate zone
                    </div>
                    <div className="border border-solid border-black px-3 py-2 bg-dark-bottle-green text-white font-bold h-[30vh] text-lg">
                      Growth avg
                    </div>
                    <div className="border border-solid border-black px-3 py-2 bg-dark-bottle-green text-white font-bold h-[30vh] text-lg">
                      Rainfall avg
                    </div>
                    <div className="border border-solid border-black px-3 py-2 bg-dark-bottle-green text-white font-bold h-[30vh] text-lg">
                      Temperature avg
                    </div>
                    <div className="border border-solid border-black px-3 py-2 bg-dark-bottle-green text-white font-bold h-[30vh] text-lg">
                      Avg soil ph
                    </div>
                    <div className="border border-solid border-black px-3 py-2 bg-dark-bottle-green text-white font-bold h-[30vh] text-lg">
                      Ktmp
                    </div>
                    <div className="border border-solid border-black px-3 py-2 bg-dark-bottle-green text-white font-bold h-[30vh] text-lg">
                      Ktmpr
                    </div>
                    <div className="border border-solid border-black px-3 py-2 bg-dark-bottle-green text-white font-bold h-[30vh] text-lg">
                      Life form
                    </div>
                    <div className="border border-solid border-black px-3 py-2 bg-dark-bottle-green text-white font-bold h-[30vh] text-lg">
                      Life span
                    </div>
                    <div className="border border-solid border-black px-3 py-2 bg-dark-bottle-green text-white font-bold h-[30vh] text-lg">
                      Biennial
                    </div>
                    <div className="border border-solid border-black px-3 py-2 bg-dark-bottle-green text-white font-bold h-[30vh] text-lg">
                      Photo
                    </div>
                    <div className="border border-solid border-black px-3 py-2 bg-dark-bottle-green text-white font-bold h-[30vh] text-lg">
                      Texture
                    </div>
                  </div>
                {/* </thead> */}

                {plantsInfo.map((plant) => {
                  return (
                    <div key={plant.plant_name} className="odd:bg-white even:bg-light-green flex flex-col flex-1">
                      <div className="border border-solid border-black text-center px-[3vw] py-2 w-full text-black font-bold h-[10vh] text-lg">
                        {plant.plant_name.toUpperCase()}
                      </div>
                      <div className="border border-solid border-black text-left px-[3vw] py-2 w-full text-black h-[30vh] text-lg">
                        {plant.attributes}
                      </div>
                      <div className="border border-solid border-black text-left px-[3vw] py-2 w-full text-black h-[30vh] text-lg">
                        {plant.category}
                      </div>
                      <div className="border border-solid border-black text-left px-[3vw] py-2 w-full text-black h-[30vh] text-lg">
                        {plant.cliz}
                      </div>
                      <div className="border border-solid border-black text-left px-[3vw] py-2 w-full text-black h-[30vh] text-lg">
                        {plant.gavg}
                      </div>
                      <div className="border border-solid border-black text-left px-[3vw] py-2 w-full text-black h-[30vh] text-lg">
                        {plant.ravg}
                      </div>
                      <div className="border border-solid border-black text-left px-[3vw] py-2 w-full text-black h-[30vh] text-lg">
                        {plant.tavg}
                      </div>
                      <div className="border border-solid border-black text-left px-[3vw] py-2 w-full text-black h-[30vh] text-lg">
                        {plant.phavg}
                      </div>
                      <div className="border border-solid border-black text-left px-[3vw] py-2 w-full text-black h-[30vh] text-lg">
                        {plant.ktmp}
                      </div>
                      <div className="border border-solid border-black text-left px-[3vw] py-2 w-full text-black h-[30vh] text-lg">
                        {plant.ktmpr}
                      </div>
                      <div className="border border-solid border-black text-left px-[3vw] py-2 w-full text-black h-[30vh] text-lg">
                        {plant.life_form}
                      </div>
                      <div className="border border-solid border-black text-left px-[3vw] py-2 w-full text-black h-[30vh] text-lg">
                        {plant.life_span}
                      </div>
                      <div className="border border-solid border-black text-left px-[3vw] py-2 w-full text-black h-[30vh] text-lg">
                        {plant.biennial}
                      </div>
                      <div className="border border-solid border-black text-left px-[3vw] py-2 w-full text-black h-[30vh] text-lg">
                        {plant.photo}
                      </div>
                      <div className="border border-solid border-black text-left px-[3vw] py-2 w-full text-black h-[30vh] text-lg">
                        {plant.texture}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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
