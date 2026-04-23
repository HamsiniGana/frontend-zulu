import Navbar from "./Navbar"
import { plantAndImgMap } from "./plantsAndImagesMap"
import plantImg from "../assets/bg-img.avif"
import { useState, useEffect, useRef } from "react"
import CalendarCard from "./CalendarCard"
import account from "../assets/account.png"
import axios from "axios"
import DisplayModal from "./DisplayModal"
import { IrrigationGraph, TemperatureGraph } from "./DashboardGraphs"
import UserPlantCard from "./UserPlantCard"
import { GetRiskRatio, GetRiskInsight,  GetMostSensitive } from "./GetRiskInsight"

export default function UserDataDashboard() {
  const user = localStorage.getItem("username") || "Guest"
  const fetchedRef = useRef(false)
  const [modalMsg, setModalMsg] = useState("")
  const [modalTitle, setModalTitle] = useState("")
  const [plants, setPlants] = useState([])
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [view, setView] = useState("home")

  useEffect(() => {
    if (user === "Guest") {
      setModalTitle("Welcome!")
      setModalMsg("Create an account to track your plants.")
      return
    }

    if (fetchedRef.current) return
    fetchedRef.current = true

    async function fetchData() {
      try {
        const res = await axios.get(
          `https://sengzulu.gentlehill-6b9262ed.australiaeast.azurecontainerapps.io/v2/user/${user}`
        )

        const formatted = res.data.map(p => ({
          ...p,
          irrigation_dates: p.irrigation_dates || [],
          temp_events: p.temp_events || [],
          image:
            plantAndImgMap[p.plant_name.toLowerCase()] ||
            plantAndImgMap["default"]
        }))

        setPlants(formatted)

      } catch (e) {
        setModalTitle("Woops!")
        setModalMsg("Failed to fetch data")
      }
    }

    fetchData()

  }, [user])

  const riskRatio = selectedPlant ? GetRiskRatio(selectedPlant) : 0
  const riskInfo = GetRiskInsight(selectedPlant, riskRatio)
  const mostSensitive = GetMostSensitive(plants, GetRiskRatio)

  return (
    <div className="flex flex-col"
      style={{ backgroundImage: `url(${plantImg})` }}
    >
      <Navbar />
      <div className="flex min-h-screen p-6 gap-6">

        {/* content tab */}
        <div className="w-[260px] flex flex-col items-center p-5
          bg-white/10 rounded-3xl border border-white shadow-xl"
          style={{backdropFilter: "blur(10px)"}}
        >
          <img src={account} alt="User avatar" className="w-[90px] mb-3" />
          <h2 className="text-white font-bold">{user}</h2>

          <div className="flex flex-col w-full gap-3 mt-6">
            <button
              onClick={() => setView("home")}
              className={`p-3 rounded-xl ${
                view === "home" ? "bg-dark-green text-white" : "bg-white text-black"
              }`}
            >
              HOME
            </button>

            <button
              onClick={() => setView("plants")}
              className={`p-3 rounded-xl ${
                view === "plants" ? "bg-dark-green text-white" : "bg-white text-black"
              }`}
            >
              PLANTS
            </button>
          </div>
        </div>

        {/* info panel */}
        <div className="flex-1 p-6 bg-white/10 rounded-3xl border border-white"
          style={{backdropFilter: "blur(10px)"}}
        >

          {/* home info */}
          {view === "home" && (
            <div className="text-white space-y-6">
              <h1 className="text-3xl font-bold">Welcome {user} 🌿</h1>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white text-black p-4 rounded-xl">
                  <h3 className="font-bold">Plants Count</h3>
                  <p className="text-2xl">{plants.length}</p>
                </div>

                <div className="bg-white text-black p-4 rounded-xl">
                  <h3 className="font-bold">Most Sensitive Plant</h3>
                  <p>{mostSensitive?.plant_name || "Your plants are safe"}</p>
                </div>
              </div>

              <div className="bg-white text-black p-5 rounded-xl">
                <h2 className="font-bold mb-2">Insights ✨</h2>
                
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-semibold">Pay Attention to Planting Zones - </span>{"  "}
                    if you are planting outdoors and from a seed, check the back 
                    of your seed packet for suggested zone and timing for planting
                  </li>
                  <li>
                    <span className="font-semibold">Pay Attention to Planting Zones - </span>{"  "}
                    overwatering can be just as 
                    harmful as underwatering. Make sure to check the soil 
                    moisture before watering.
                  </li>
                  <li>
                    <span className="font-semibold">Watchout for Hot Weathers - </span>{"  "}
                    When the temperature is too high, plants respire rapidly. 
                    This can lead to dehydration and wilting. Consider providing 
                    shade or water in the early morning or late evening. 
                  </li>
                </ul>
              </div>

            </div>
          )}

          {/* plants info */}
          {view === "plants" && (
            <div>
              <h1 className="text-white text-2xl mb-4">Your Plants</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {plants.map((p, i) => (
                  <UserPlantCard 
                    key={i} plant={p}
                    onCalendar={() => {
                      setSelectedPlant(p); setView("calendar");
                    }}
                    onRisk={() => {
                      setSelectedPlant(p); setView("risk");
                    }}
                  />
                ))}
              </div> 
            </div> 
          )}

          {/* calendar */}
          {view === "calendar" && selectedPlant && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setView("plants")}
                  className="bg-black text-white px-4 py-2 rounded flex items-center"
                >
                  ← Back
                </button>  
                <button
                  onClick={() => setView("risk")}
                  className="bg-red-500 text-black px-4 py-2 rounded flex items-center"
                >
                  Risk
                </button>
              </div>
              <CalendarCard
                water={selectedPlant.irrigation_dates}
                tempEvents={selectedPlant.temp_events}
                plant={selectedPlant.plant_name}
              />

              <div className="mt-6 bg-white p-4 rounded-xl">
                <IrrigationGraph plant={selectedPlant} />
              </div>

            </div>
          )}

          {/* risk */}
          {view === "risk" && selectedPlant && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setView("plants")}
                  className="bg-black text-white px-4 py-2 rounded flex items-center"
                >
                  ← Back
                </button>

                <button
                  onClick={() => setView("calendar")}
                  className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                >
                  Calendar
                </button>
              </div>

              <div className="bg-white p-4 rounded-xl mb-6">
                <TemperatureGraph plants={[selectedPlant]} />
              </div>

              <div className="bg-white p-4 rounded-xl">
                <h2 className="font-bold mb-2">Summary</h2>
                <p>🔥 Days that are too hot: {selectedPlant.hot_days}</p>
                <p>❄️ Days that are too cold: {selectedPlant.cold_days}</p>
                <p>⚠️ Total days at risk: {selectedPlant.total_risk}</p>
                <p className={`${riskInfo.colour} mt-2`}>{riskInfo.label}</p>
              </div>
            </div>
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
  )
}