import Navbar from "./Navbar";
import bgImg from "../assets/bg-img.avif";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import DisplayModal from "./DisplayModal";
import Dropdown from "react-bootstrap/Dropdown";


export default function TradeGraph() {
  const [country, setCountry] = useState("");
  const [period, setPeriod] = useState("");
  const [commodity, setCommodity] = useState("");
  const [trade, setTrade] = useState("Trade Type");
  const [variable, setVariable] = useState("Variable")
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false)
  const [modalMsg, setModalMsg] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const tradeGraphFn = async () => {
    setLoading(true)
    setImgUrl(null)

    if(!country.trim() || !commodity.trim() || !period.trim() 
       || trade.trim() === "Trade Type" || variable.trim() === "Variable") {
        setModalTitle("Missing Input")
        setModalMsg("All the input fields are required")
        setLoading(false)
        return
    }

    const params = new URLSearchParams();

    params.append("country", country);
    params.append("period", period);
    params.append("trade_type", trade);
    params.append("commodity", commodity);
    params.append("measurement", variable)

    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:8000/trade_report/visual?${params.toString()}`,
        responseType: "blob",
    });
      if(imgUrl) URL.revokeObjectURL(imgUrl)

      const url = URL.createObjectURL(res.data)
      setImgUrl(url)
    } catch (e) {
        try {
          const blob = e.response?.data;
          const text = await blob.text();
          const json = JSON.parse(text);
          const detail = json.detail;
          setModalMsg(detail);
        } catch {
          setModalMsg("Unexpected error occurred");
        }
    }
    setLoading(false)
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
          <h3 className="text-white mt-4">Trade Graph Visualiser</h3>
          <div
            className="flex flex-col bg-white/20 p-3 rounded-2xl border border-solid border-white/10 m-3"
            style={{ backdropFilter: "blur(5px)" }}
          >
            <p className="text-white text-xl text-center">
              Filter Search Criteria
            </p>
            <div
              className="flex flex-col bg-dark-bottle-green/60 p-3 rounded-xl"
              style={{ backdropFilter: "blur(5px)" }}
            >
              {/* Row 1 */}
              <div className="flex flex-row">
                <div className="flex flex-col p-3">
                  <p className="text-white"> * Country: </p>
                  <Form.Control
                    type="text"
                    placeholder="E.g. Australia"
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="flex flex-col p-3">
                  <p className="text-white"> * Year Range: </p>
                  <Form.Control
                    type="text"
                    placeholder="E.g. 2000-2010"
                    onChange={(e) => setPeriod(e.target.value)}
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex flex-row gap-4 w-full">
                <div className="flex flex-col w-1/3">
                  <p className="text-white"> * Commodity: </p>
                  <Form.Control
                    type="text"
                    placeholder="E.g. Pineapple"
                    onChange={(e) => setCommodity(e.target.value)}
                  />
                </div>

                <div className="flex flex-col w-1/3">
                  <p className="text-white"> * Trade type: </p>
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        borderColor: "white",
                        width: "100%",
                      }}
                    >
                      {trade}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setTrade("UNTradeImports")}>
                        UNTradeImports
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setTrade("UNTradeExports")}>
                        UNTradeExports
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setTrade("UNTradeReExports")}>
                        UNTradeReExports
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                
                <div className="flex flex-col w-1/3">
                  <p className="text-white"> * Variable </p>
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      style={{
                        backgroundColor: "white", 
                        color: "black",
                        borderColor: "white",
                        width: "100%",
                      }}
                    >
                      {variable}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setVariable("Price")}>
                          Price
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setVariable("Quantity")}>
                          Quantity
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              
              {/* Row 3 */}
              <div className="flex justify-center mt-4">
                <button
                  className="bg-dark-bottle-green/70 p-3 rounded-2xl text-white w-full"
                  onClick={() => tradeGraphFn()} disabled={loading}
                >
                {loading ? "Generating Graph..." : "Get Graph"}
                </button>   
              </div>  

            </div>
            {imgUrl && (
              <div className="bg-white p-4 rounded-2xl shadow-lg mb-4">
                <img
                  src={imgUrl}
                  alt="Trade graph"
                  className="max-w-full"
                />
              </div>
            )}

          </div>
        </div>
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
