/*
API used: 
Forward geocoding 
- https://nominatim.org/release-docs/latest/api/Search/#free-form-query

weather forecast grabbing 
- https://open-meteo.com/en/docs 
*/


import {useState, useEffect} from "react"
import axios from "axios"

export default function DataPage() {
    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)
    const [addr, setAddr] = useState("")
    const [weather, setWeather] = useState([])

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
      if (!addr) return 
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addr)}`
      const res = await axios.get(url)
      if (res.data.length > 0) {
            setLon(parseFloat(res.data[0].lon))
            setLat(parseFloat(res.data[0].lat))
          } 
    }

    // Grab the real-time weather forcast 
    async function weatherData(lon, lat) {
        const url = `https://api.open-meteo.com/v1/forecast` +
                    `?forecast_days=7` +
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

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Coordinate</h1>

      <div className="flex flex-col gap-3 w-[300px] mb-5">
        <label className="font-semibold">Enter your address:</label>
        <input
          type="text"
          placeholder={lat ? `Lat: ${lat}` : "e.g. Kensington, NSW"}
          value={addr}
          onChange={(e) => setAddr(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addrToLat(addr)}
          className="border border-black rounded-md px-3 py-2"
        />
        <button
          onClick={() => addrToLat(addr)}
          className="bg-dark-bottle-green text-white px-3 py-2 rounded-md mt-2 hover:bg-white hover:text-black border border-black"
        >
          Get Coordinates
        </button>
      </div>

      {lat && lon && (
        <div>
          <p className="mb-3">
            Coordinates: <span className="font-bold">{lat}, {lon}</span>
          </p>
          {weather.length > 0 ? (
            <table className="border-collapse border border-black">
              <thead>
                <tr>
                  <th className="border border-black px-2">Date</th>
                  <th className="border border-black px-2">Max Temp (°C)</th>
                  <th className="border border-black px-2">Min Temp (°C)</th>
                  <th className="border border-black px-2">Rainfall (mm)</th>
                </tr>
              </thead>
              <tbody>
                {weather.map((day) => (
                  <tr key={day.date}>
                    <td className="border border-black px-2">{day.date}</td>
                    <td className="border border-black px-2">{day.max}</td>
                    <td className="border border-black px-2">{day.min}</td>
                    <td className="border border-black px-2">{day.rain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>
      )}
    </div>
  )
}
