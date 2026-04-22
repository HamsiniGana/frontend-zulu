import { useState, useEffect } from "react"
import axios from "axios"
import Navbar from "./Navbar"
import bgImage from "../assets/bg-img.avif"
import DisplayModal from "./DisplayModal"
import CalendarCard from "./CalendarCard"

export default function DataPage() {
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const [addr, setAddr] = useState("")
  const [plant, setPlant] = useState("")
  const [soil, setSoil] = useState("")
  const [water, setWater] = useState([])
  const [tempEvents, setTempEvents] = useState([])
  const [plantDate, setPlantDate] = useState("")
  const [modalMsg, setModalMsg] = useState("")
  const [modalTitle, setModalTitle] = useState("")
  const[loading, setLoading] = useState("")

  // Get user's location (optional)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(pos.coords.latitude)
          setLon(pos.coords.longitude)
        },
        (err) => console.log(err.message)
      )
    }
  }, [])

  async function getWateringDays() {
    if (!plant.trim()) {
      setModalTitle("Missing Input")
      setModalMsg("Please enter a plant name")
      return
    }

    if (!lat && !lon && !addr.trim()) {
      setModalTitle("Location Required")
      setModalMsg("Please allow location access or enter the location of your plant")
      return
    }

    setLoading(true)

    try {
      const res = await axios({
        method: "post",
        url: `https://sengzulu.gentlehill-6b9262ed.australiaeast.azurecontainerapps.io/v2/plants/${plant}/water`,
        params: {
          soil_type: soil || "loam"
        },
        data: {
          latitude: lat || null,
          longitude: lon || null,
          address: addr || null,
          plant_date: plantDate || null
        },
      })

      if(res.status === 200) {
        setWater(res.data.watering_days)
        setTempEvents(res.data.temperature_events)
      } else {
        setModalTitle("Woops!")
        setModalMsg("Something went wrong :(")
      }
      
    } catch (e) {
      setModalTitle("Woops!");   
      setModalMsg("Failed to fetch watering guide");  
    } finally {
      setLoading(false)
    }
  }

  async function saveData() {
    const user = localStorage.getItem("username")

    if(!user) {
      setModalTitle("Error")
      setModalMsg("User not logged in")
      return
    }
    
    try {
      await axios({
        method: "post",
        url: `https://sengzulu.gentlehill-6b9262ed.australiaeast.azurecontainerapps.io/v2/save`,
        params: {
          username: user, 
          plant_name: plant
        },
        data: {
          irrigation_dates: water, 
          temperature_data: tempEvents, 
          plant_date: plantDate || null
        },
      })
      setModalTitle("Success")
      setModalMsg("Saved successfully")
    } catch (e) {
      setModalTitle("Woops")
      setModalMsg("Failed to save data")
    }
  }

  return (
    <div
      className="flex flex-col"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        zIndex: "1"
      }}
    >
      <Navbar />
      <div className="min-h-screen flex flex-col items-center">
        <div
          className="flex flex-col w-full max-w-5xl mt-[5vh] p-4 md:p-8
          bg-white/10
          rounded-3xl shadow-2xl shadow-dark-bottle-green
          hover:scale-[1.01] border border-solid border-white"
          style={{ backdropFilter: "blur(10px)" }}
        >
          <h1 className="text-white font-bold text-3xl mb-6 text-center">
            Irrigation Guide
          </h1>

          <div className="flex flex-wrap gap-6 justify-center">
            <div className="flex flex-col gap-3 w-full max-w-[300px]">
              <label className="font-semibold text-white">
                When did you plant it? (optional):
              </label>

              <input
              type="date"
              value={plantDate}
              onChange={(e) => setPlantDate(e.target.value)}
              className="border border-black rounded-xl px-3 py-2 focus:outline-none"
              />
            </div>
            
            <div className="flex flex-col gap-3 w-full max-w-[300px]">
              <label className="font-semibold text-white">
                Enter your plant's location:
              </label>

              <input
                type="text"
                placeholder={
                  lat
                    ? `Using device location (Lat: ${lat.toFixed(2)}, Lon: ${lon?.toFixed(2)})`
                    : "e.g. Kensington, NSW"
                }
                value={addr}
                onChange={(e) => setAddr(e.target.value)}
                className="border border-black rounded-xl px-3 py-2 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-3 w-full max-w-[300px]">
              <label className="font-semibold text-white">
                Select your soil type (optional):
              </label>

              <select
                value={soil}
                onChange={(e) => setSoil(e.target.value)}
                className="border border-black rounded-xl px-3 py-2 text-center focus:outline-none"
              >
                <option value=""> -- Choose soil type -- </option>
                <option value="clay">clay</option>
                <option value="loam">loam</option>
                <option value="sand">sand</option>
                <option value="clay loam">clay loam</option>
                <option value="sandy loam">sandy loam</option>
                <option value="loamy sand">loamy sand</option>
              </select>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-[300px]">
              <label className="font-semibold text-white">
                Enter plant name:
              </label>

              <input
                type="text"
                placeholder="e.g. tomato"
                value={plant}
                onChange={(e) => setPlant(e.target.value)}
                className="border border-black rounded-xl px-3 py-2 focus:outline-none"
              />

              <button
                onClick={getWateringDays}
                disabled={loading}
                className="bg-black text-white py-2 px-3 rounded-xl
                hover:!bg-white hover:!text-black hover:!border-black hover:!border-2 transition
                disabled:opacity-50"
              >
                {loading ? "Getting Water guide..." : "Get Watering Guide"}
              </button>
            </div>
          </div>
          <CalendarCard water={water} tempEvents={tempEvents} plant={plant} onSave={saveData}/>
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