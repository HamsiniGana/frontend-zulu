import Navbar from "./Navbar";
import bgImg from "../assets/bg-img.avif";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import DisplayModal from "./DisplayModal";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";

export default function TradeReport() {
  const [trade, setTrade] = useState("Trade Type");
  const [country, setCountry] = useState("");
  const [year, setYear] = useState(0);
  const [commodity, setCommodity] = useState("");
  const [report, setReport] = useState([]);
  const [modalMsg, setModalMsg] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [loading, setLoading] = useState(false)

  const tradeReportFn = async () => {
    setLoading(true);
    const params = new URLSearchParams();

    params.append("country", country);
    params.append("year", year);
    params.append("trade_type", trade);
    if (commodity !== "") {
      params.append("commodity", commodity);
    }
    try {
      const res = await axios({
        method: "get",
        url: `https://sengzulu.gentlehill-6b9262ed.australiaeast.azurecontainerapps.io/trade_report/?${params.toString()}`,
      });
      //   console.log(res);
      setReport(res.data.slice(0, 31));
      if (res.data.length === 0) {
        setModalTitle("Oh oh");
        setModalMsg("This country has no trade reports");
      }
    } catch (e) {
      // console.log(e.response)
      setModalTitle("Woops!");

      if (e.response.data.detail[0].msg) {
        setModalMsg(e.response.data.detail[0].msg);
      } else if (e.response.data.detail) {
        setModalMsg(e.response.data.detail);
      }
    }
    setLoading(false);
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
          <h3 className="text-white mt-4">Trade Data Query</h3>
          <div
            className="flex flex-col bg-white/20 p-3 rounded-2xl border border-solid border-white/10 m-3"
            style={{ backdropFilter: "blur(5px)" }}
          >
            <p className="text-white text-xl text-center">
              Filter Search Criteria
            </p>
            <div
              className="flex flex-col bg-dark-bottle-green/60 p-3 rounded-xl "
              style={{ backdropFilter: "blur(5px)" }}
            >
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <div className="flex flex-col p-3">
                    <p className="text-white"> * Country: </p>
                    <Form.Control
                      type="text"
                      placeholder="Enter Country"
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col p-3">
                    <p className="text-white"> * Year: </p>
                    <Form.Control
                      type="number"
                      placeholder="Enter Year"
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-row">
                  <div className="flex flex-col p-3">
                    <p className="text-white"> Commodity: </p>
                    <Form.Control
                      type="text"
                      placeholder="Enter Commodity"
                      onChange={(e) => setCommodity(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col p-3">
                    <p className="text-white"> * Trade Type: </p>
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          borderColor: "white",
                        }}
                      >
                        {trade}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => setTrade("UNTradeImports")}
                        >
                          UNTradeImports
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setTrade("UNTradeExports")}
                        >
                          UNTradeExports
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setTrade("UNTradeReExports")}
                        >
                          UNTradeReExports
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>

                <button
                  className="bg-dark-bottle-green/70 p-3 rounded-2xl text-white"
                  onClick={() => tradeReportFn()} disabled={loading}
                >
                  {loading ? "Generating Report..." : "Get Report"}
                </button>
              </div>

              <div className="flex flex-row"></div>
            </div>
          </div>
          {report.length === 0 && (
            <DisplayModal
              modalMsg={modalMsg}
              modalTitle={modalTitle}
              show={modalMsg !== ""}
              setModalMsg={setModalMsg}
            />
          )}
          {report.length > 0 && (
            <Table className="glass-table" style={{ width: "85vw" }}>
              <thead>
                <tr style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                  {/* <th>#</th> */}
                  <th>Partner country code</th>
                  <th>HS6 code</th>
                  <th>Quantity1</th>
                  <th>Quantity2</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody style={{ overflowY: "scroll" }}>
                {report.map((row, index) => {
                  return (
                    <tr
                      key={index}
                      style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                    >
                      <td>{row.partner_country_code}</td>
                      <td>{row.hS6_code}</td>
                      <td>{row.quantity1}</td>
                      <td>{row.quantity2}</td>
                      <td>{row.value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
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
  );
}
