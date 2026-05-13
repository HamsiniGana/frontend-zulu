import Navbar from "./Navbar";
import bgImg from "../assets/bg-img.avif";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState, useEffect } from "react";
import axios from "axios";
import DropdownSuggestions from "./DropdownSuggestions";
import ToggleBtn from "./ToggleBtn";
import Slider from "./Slider";
import DisplayModal from "./DisplayModal";

export default function SearchPlant() {
  const [plant, setPlant] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [plantNameSuggestions, setPlantNameSuggestions] = useState([]);
  const [lifeForms, setLifeForms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [phMin, setPhMin] = useState(-1);
  const [phMax, setPhMax] = useState(-1);
  const [lifespan, setLifespan] = useState([]);
  const [climatZones, setClimateZones] = useState([]);
  const [modalMsg, setModalMsg] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [availablePlants, setAvailablePlants] = useState([]);

  useEffect(() => {
    // if (plantNameSuggestions.length == 0) return
    const searchPlantFn = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `http://localhost:8000/v2/plants/search?search=${plant}`,
        });
        setPlantNameSuggestions(res.data);

        // console.log(res.data)
      } catch (e) {
        // console.log(e);
        // setModalTitle("Woops!")
        alert("Unable to fetch plant name suggestions");
      }
    };
    searchPlantFn();
    if (plant.trim() === "") {
      setShowSuggestions(false);
    }
  }, [plant]);

  const searchForPlants = async () => {
    try {
      const params = new URLSearchParams();

      if (plant !== "") {
        params.append("search", plant);
      }

      if (lifeForms.length !== 0) {
        lifeForms.forEach((form) => params.append("life_form", form));
      }

      if (categories.length !== 0) {
        categories.forEach((cat) => params.append("category", cat));
      }

      if (lifespan.length !== 0) {
        lifespan.forEach((span) => params.append("life_span", span));
      }

      if (climatZones.length !== 0) {
        climatZones.forEach((zone) => params.append("climate_zone", zone));
      }

      if (phMin !== -1) {
        params.append("ph_min", phMin);
      }

      if (phMax !== -1) {
        params.append("ph_max", phMax);
      }
      const res = await axios({
        method: "get",
        url: `http://localhost:8000/v2/plants/search?${params.toString()}`,
      });
      setPlantNameSuggestions(res.data);
      console.log(res.data);
      if (res.data.length === 0) {
        setModalMsg("Could not find plant with given parameters");
        setModalTitle("Sorry 🥲");
      } else {
        setAvailablePlants(res.data);
      }
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
        paddingBottom: "0.1vh",
      }}
    >
      <Navbar />
      <div
        className="bg-white/10 min-h-[80vh] flex flex-col mt-4 mb-5 mx-3 rounded-2xl items-center justify-center border border-solid border-white"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <div className="flex flex-col justify-between items-center w-full">
          <h2 className="text-white ml-3 w-full text-center pt-2">
            Search plant
          </h2>
          <div style={{ marginTop: "-5px" }} className="mr-3">
            <Form className="pb-5">
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Enter the plant's name"
                    className=" mt-3"
                    style={{
                      width: "80vw",
                      borderColor: "black",
                      borderWidth: "2px",
                    }}
                    value={plant}
                    onChange={(e) => {
                      setPlant(e.target.value);
                      // searchPlantFn()
                      setShowSuggestions(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        searchForPlants();
                      }
                    }}
                  />
                </Col>
                <Col xs="auto" className="gap-5">
                  <Button
                    style={{
                      backgroundColor: "var(--dark-green)",
                      borderColor: "black",
                      // marginLeft: "-20px",
                      borderWidth: "2px",
                    }}
                    className="mt-3 hover:!bg-white hover:!text-black hover:border hover:border-solid hover:border-black"
                    onClick={() => searchForPlants()}
                  >
                    Search
                  </Button>

                  <Button
                    style={{
                      backgroundColor: "var(--medium-green)",
                      borderColor: "black",
                      marginLeft: "8px",
                      borderWidth: "2px",
                      color: "black",
                    }}
                    className="mt-3 hover:!bg-white hover:!text-black hover:border hover:border-solid hover:border-black"
                    onClick={() => {
                      setCategories([]);
                      setClimateZones([]);
                      setLifeForms([]);
                      setLifespan([]);
                      setPhMax(-1);
                      setPhMin(-1);
                      setShowSuggestions(false);
                      setPlant("");
                      setPlantNameSuggestions([]);
                      setAvailablePlants([]);
                      setModalMsg("");
                      setModalTitle("");
                    }}
                  >
                    Reset params
                  </Button>
                </Col>
              </Row>
              <DropdownSuggestions
                plantSuggestions={plantNameSuggestions}
                setPlant={setPlant}
                setShow={setShowSuggestions}
                show={showSuggestions}
              />
            </Form>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-col mx-3 flex-1">
            <div className="flex flex-col ml-3">
              <p className="text-white">🪴 Life form:</p>
              <div className="flex flex-row gap-1">
                <div className="flex flex-row gap-2">
                  <ToggleBtn
                    list={lifeForms}
                    setList={setLifeForms}
                    stringPassed={"grass"}
                  />
                  <ToggleBtn
                    list={lifeForms}
                    setList={setLifeForms}
                    stringPassed={"herb"}
                  />
                  <ToggleBtn
                    list={lifeForms}
                    setList={setLifeForms}
                    stringPassed={"vine"}
                  />
                </div>

                <div className="flex flex-row gap-2">
                  <ToggleBtn
                    list={lifeForms}
                    setList={setLifeForms}
                    stringPassed={"sub-shrub"}
                  />
                  <ToggleBtn
                    list={lifeForms}
                    setList={setLifeForms}
                    stringPassed={"shrub"}
                  />
                  <ToggleBtn
                    list={lifeForms}
                    setList={setLifeForms}
                    stringPassed={"tree"}
                  />
                </div>
              </div>
            </div>
            <hr className="border border-solid border-white/50 w-[20vw] mx-2" />

            <div className="flex flex-col ml-3">
              <p className="text-white">🌿 Lifespan:</p>
              <div className="flex flex-row gap-1">
                <div className="flex flex-row gap-2"></div>

                <ToggleBtn
                  list={lifespan}
                  setList={setLifespan}
                  stringPassed={"annual"}
                />
                <ToggleBtn
                  list={lifespan}
                  setList={setLifespan}
                  stringPassed={"perrenial"}
                />
                <ToggleBtn
                  list={lifespan}
                  setList={setLifespan}
                  stringPassed={"biennial"}
                />
              </div>
            </div>
            <hr className="border border-solid border-white/50 w-[20vw] mx-2" />

            <div className="flex flex-col ml-3">
              <p className="text-white">🌳 Attributes:</p>
              <div className="flex flex-row gap-1">
                <div className="flex flex-row gap-2"></div>
                <ToggleBtn
                  list={lifeForms}
                  setList={setLifeForms}
                  stringPassed={"grow on small scale"}
                />
                <ToggleBtn
                  list={lifeForms}
                  setList={setLifeForms}
                  stringPassed={"grow on large scale"}
                />
              </div>
            </div>
            <hr className="border border-solid border-white/50 w-[20vw] mx-2" />
          </div>
          <hr className="h-[50vh] border border-solid border-white/50" />

          <div className="flex flex-col">
            <div className="flex flex-col mx-3 pb-2">
              <p className="text-white">📂 Category:</p>
              <div className="flex flex-row flex-wrap gap-1">
                <div className="flex flex-row gap-2 flex-wrap">
                  <ToggleBtn
                    list={categories}
                    setList={setCategories}
                    stringPassed={"forage/pasture"}
                  />
                  <ToggleBtn
                    list={categories}
                    setList={setCategories}
                    stringPassed={"cover crop"}
                  />
                  <ToggleBtn
                    list={categories}
                    setList={setCategories}
                    stringPassed={"fruits & nuts"}
                  />
                  <ToggleBtn
                    list={categories}
                    setList={setCategories}
                    stringPassed={"vegetables"}
                  />
                  <ToggleBtn
                    list={categories}
                    setList={setCategories}
                    stringPassed={"materials"}
                  />
                  <ToggleBtn
                    list={categories}
                    setList={setCategories}
                    stringPassed={"cereals & pseudocereals"}
                  />

                  <ToggleBtn
                    list={categories}
                    setList={setCategories}
                    stringPassed={"roots/tubers"}
                  />
                  <ToggleBtn
                    list={categories}
                    setList={setCategories}
                    stringPassed={"medicinals & aromatic"}
                  />

                  <ToggleBtn
                    list={categories}
                    setList={setCategories}
                    stringPassed={"ornamentals/turf"}
                  />
                  <ToggleBtn
                    list={categories}
                    setList={setCategories}
                    stringPassed={"forest/wood"}
                  />

                  <ToggleBtn
                    list={categories}
                    setList={setCategories}
                    stringPassed={"pulses (grain legumes)"}
                  />
                  <ToggleBtn
                    list={categories}
                    setList={setCategories}
                    stringPassed={"environmental"}
                  />
                </div>
              </div>
            </div>

            <hr className="w-[60vw] mx-3 border border-solid border-white/50" />

            <div className="flex flex-col mx-3 pb-2">
              <p className="text-white">🌏 Climate zone:</p>
              <div className="flex flex-row flex-wrap gap-1">
                <div className="flex flex-row gap-2 flex-wrap">
                  <ToggleBtn
                    list={climatZones}
                    setList={setClimateZones}
                    stringPassed={"tropical wet & dry"}
                  />
                  <ToggleBtn
                    list={climatZones}
                    setList={setClimateZones}
                    stringPassed={"tropical wet"}
                  />
                  <ToggleBtn
                    list={climatZones}
                    setList={setClimateZones}
                    stringPassed={"steppe or semiarid"}
                  />
                  <ToggleBtn
                    list={climatZones}
                    setList={setClimateZones}
                    stringPassed={"subtropical humid"}
                  />
                  <ToggleBtn
                    list={climatZones}
                    setList={setClimateZones}
                    stringPassed={"subtropical dry summer"}
                  />
                  <ToggleBtn
                    list={climatZones}
                    setList={setClimateZones}
                    stringPassed={"subtropical dry winter"}
                  />
                  <ToggleBtn
                    list={climatZones}
                    setList={setClimateZones}
                    stringPassed={"temperate oceanic"}
                  />
                  <ToggleBtn
                    list={climatZones}
                    setList={setClimateZones}
                    stringPassed={"temperate continental"}
                  />
                  <ToggleBtn
                    list={climatZones}
                    setList={setClimateZones}
                    stringPassed={"temperate with humid winters"}
                  />
                  <ToggleBtn
                    list={climatZones}
                    setList={setClimateZones}
                    stringPassed={"temperate with dry winters"}
                  />
                </div>
              </div>
            </div>
            <hr className="w-[60vw] mx-3 border border-solid border-white/50" />

            <div className="flex flex-row gap-5 mx-3">
              <Slider
                label={"Ph min:"}
                min={0}
                max={14}
                step={1}
                defaultValue={7}
                setState={setPhMin}
              />

              <Slider
                label={"Ph max:"}
                min={0}
                max={14}
                step={1}
                defaultValue={7}
                setState={setPhMax}
              />
            </div>
          </div>
        </div>
        {availablePlants.length >= 1 && (
          <div className="bg-white/80 p-3 rounded-xl m-3 w-[30vw] flex flex-col items-center max-h-[25vh] overflow-y-auto">
            <h5>Available plants:</h5>
            <div>
              {availablePlants.map((plant, index) => {
                return <p key={index}>{plant}</p>;
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
  );
}
