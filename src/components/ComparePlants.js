import Navbar from "./Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import DisplayModal from "./DisplayModal";
import axios from "axios";
import ClosableTabs from "./ClosableTabs";
import plantBg from "../assets/plant-bg.jpg";
import CompareCard from "./CompareCard";

export default function ComparePlants() {
  const [plants, setPlants] = useState(() => {
    return localStorage.getItem("plants")
      ? JSON.parse(localStorage.getItem("plants"))
      : [];
  });
  const [newPlant, setNewPlant] = useState("");
  const [plantsInfo, setPlantsInfo] = useState(() => {
    return localStorage.getItem("plantsInfo")
      ? JSON.parse(localStorage.getItem("plantsInfo"))
      : [];
  });
  const [modalMsg, setModalMsg] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("plants", JSON.stringify(plants));
    localStorage.setItem("plantsInfo", JSON.stringify(plantsInfo));
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
        height: "100vh",
      }}
    >
      <Navbar />
      <div>
        <div className="relative flex flex-col items-center bg-white/20 m-4 rounded-2xl h-[85vh] my-3 border border-solid border-white/20 backdrop-blur-sm">
          <div className="flex flex-row items-center gap-[35vw]">
            <h1 className="mt-3 text-black">Compare plants</h1>
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
                      borderColor: "black",
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
                <ClosableTabs
                  key={plant}
                  plant={plant}
                  setPlants={setPlants}
                  setPlantsInfo={setPlantsInfo}
                />
              );
            })}
            {plants.length >= 1 && (
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

          <div className="flex flex-row justify-between gap-5 overflow flex-wrap mt-3">
            {plantsInfo.length >= 1 &&
              plantsInfo.map((p) => {
                return (
                  <CompareCard
                    key={p.plant_name}
                    attributes={p.attributes}
                    category={p.category}
                    cliz={p.cliz}
                    gavg={p.gavg}
                    phavg={p.phavg}
                    tavg={p.tavg}
                    ktmp={p.ktmp}
                    ktmpr={p.ktmpr}
                    life_form={p.life_form}
                    life_span={p.life_span}
                    biennial={p.biennial}
                    photo={p.photo}
                    texture={p.texture}
                    plant_name={p.plant_name}
                  />
                );
              })}
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
