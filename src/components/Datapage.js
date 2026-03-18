/*
API used: 
Forward geocoding 
- https://nominatim.org/release-docs/latest/api/Search/#free-form-query

weather forecast grabbing 
- https://open-meteo.com/en/docs 
*/


import {useState, useEffect} from "react"
import axios from "axios"
import Navbar from "./Navbar"

export default function DataPage() {
    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)
    const [addr, setAddr] = useState("")
    const [weather, setWeather] = useState([])
    const [plant, setPlant] = useState("")
    const [water, setWater] = useState([])
    const [soil, setSoil] = useState("")

    // Request user's location access 
    useEffect(() => {
      // If browser supports location access requests 
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            // remember the coordinates 
            (pos) => {
              setLat(pos.coords.latitude) 
              setLon(pos.coords.longitude)},
            // user denied access 
            (err) => {console.log(err.message)}
        )
      }
    }, [])

    // Weather API is fethced only when lat and lon exist or have changed
    useEffect(() => {
      if (lat !== null && lon != null) {
        weatherData(lon,lat)
      }
    }, [lat, lon])

    // Geocoding to get the latitude from user input address 
    async function addrToLat(addr) {
      if (!addr) {
        alert("Enter the location of your plant")
        return
      } 
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addr)}`
      const res = await axios.get(url)
      if (res.data.length > 0) {
            setLon(parseFloat(res.data[0].lon))
            setLat(parseFloat(res.data[0].lat))
          } 
    }

    // Grab the real-time weather forcast for 7 days
    async function weatherData(lon, lat) {
        const url = `https://api.open-meteo.com/v1/forecast` +
                    `?forecast_days=14` +
                    `&latitude=${parseFloat(lat)}` +
                    `&longitude=${parseFloat(lon)}` + 
                    `&daily=temperature_2m_max,temperature_2m_min,rain_sum`
        const res = await axios.get(url)
        const resultData = res.data.daily.time.map((date, i) => ({
            date, 
            max: res.data.daily.temperature_2m_max[i], 
            min: res.data.daily.temperature_2m_min[i],
            rain: res.data.daily.rain_sum[i],
        }))
        setWeather(resultData)
      }

    // Call the irrigation calculation from the backend 
    async function getWateringDays() {
      // user needs to enter the name of the plant 
      if (!plant) {
        alert("Enter a plant name")
        return 
      }

      try{
        const url = `https://sengzulu.gentlehill-6b9262ed.australiaeast.azurecontainerapps.io/plants/${plant}/water`
        const body = {
          weatherData: weather.map((day) => ({
            date: day.date, 
            rainfall: day.rain, 
            min_temp: day.min, 
            max_temp: day.max
          })), 
          kc: null, 
          latitude: lat,
        }

        const res = await axios.post(url, body)
        setWater(res.data)

      } catch(err) {
        console.log(err)
      }
    }

return (
  <div className="flex flex-col">
    <Navbar />

    <div className="bg-light-green min-h-screen flex flex-col items-center">
      <div
        className="flex flex-col w-full max-w-5xl mt-[5vh] p-4 md:p-8
        bg-gradient-to-r from-medium-green via-light-green to-medium-green
        rounded-3xl shadow-2xl shadow-dark-bottle-green
        hover:scale-[1.01]"
      >
        <h1 className="text-dark-bottle-green font-bold text-3xl mb-6 text-center">
          Irrigation Guide
        </h1>

        {/* INPUT SECTION */}
        <div className="flex flex-wrap gap-6 justify-center">
          
          {/* ADDRESS INPUT */}
          <div className="flex flex-col gap-3 w-full max-w-[300px]">
            <label className="font-semibold text-dark-bottle-green">
              Enter your address:
            </label>

            <input
              type="text"
              placeholder={lat ? `Lat: ${lat}, Lon: ${lon}` : "e.g. Kensington, NSW"}
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              onBlur={() => addrToLat(addr)}
              className="border border-black rounded-xl px-3 py-2 focus:outline-none"
            />
          </div>

          {/* SOIL TYPE INPUT */}
          <div className="flex flex-col gap-3 w-full max-w-[300px]">
            <label className="font-semibold text-dark-bottle-green">
              Select your soil type:
            </label>

            <select
              value={soil}
              onChange={(e) => setSoil(e.target.value)}
              className="border border-black rounded-xl px-3 py-2 text-center focus:outline-none"
            >
              <option value="">-- Choose soil type --</option>
              <option value="clay">Clay</option>
              <option value="sandy">Sandy</option>
              <option value="loamy">Loamy</option>
              <option value="silty">Silty</option>
              <option value="peaty">Peaty</option>
              <option value="chalky">Chalky</option>
            </select>
          </div>

          {/* PLANT INPUT */}
          <div className="flex flex-col gap-3 w-full max-w-[300px]">
            <label className="font-semibold text-dark-bottle-green">
              Enter plant name:
            </label>

            <input
              type="text"
              placeholder="e.g tomato"
              value={plant}
              onChange={(e) => setPlant(e.target.value)}
              className="border border-black rounded-xl px-3 py-2 focus:outline-none"
            />

            <button
              onClick={getWateringDays}
              className="bg-dark-bottle-green text-white py-2 px-3 rounded-xl
              hover:bg-white hover:text-black hover:border hover:border-black transition"
            >
              Get Watering Guide
            </button>
          </div>
        </div>

        {/* RESULTS SECTION */}
        {lat && lon && (
          <div className="mt-8 w-full flex flex-col lg:flex-row gap-8 justify-center items-stretch">

            {/* WEATHER TABLE */}
            <div className="w-full lg:w-2/3 flex justify-center">
              {weather.length > 0 ? (
                <div className="w-full overflow-x-auto">
                  <table className="min-w-[500px] border-collapse border border-black bg-white rounded-xl overflow-hidden">
                    <thead className="bg-dark-bottle-green text-white">
                      <tr>
                        <th className="border px-3 py-2">Date</th>
                        <th className="border px-3 py-2">Max Temp</th>
                        <th className="border px-3 py-2">Min Temp</th>
                        <th className="border px-3 py-2">Rainfall</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weather.map((day) => (
                        <tr key={day.date} className="text-center">
                          <td className="border px-3 py-1">{day.date}</td>
                          <td className="border px-3 py-1">{day.max}</td>
                          <td className="border px-3 py-1">{day.min}</td>
                          <td className="border px-3 py-1">{day.rain}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center w-full">Loading weather data...</p>
              )}
            </div>

            {/* WATERING RESULT */}
            {water.length > 0 && (
              <div className="w-full lg:w-1/3 flex justify-center items-center">
                <div
                  className="bg-white p-5 rounded-2xl shadow-lg
                  w-full max-w-[350px] text-center h-fit"
                >
                  <h2 className="text-xl font-bold text-dark-bottle-green mb-3">
                    The days you should water your plants
                  </h2>

                  <ul className="list-disc ml-5 text-left">
                    {water.map((day, i) => (
                      <li key={i}>{day}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  </div>
);
}
