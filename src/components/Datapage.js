import {useState, useEffect} from "react"

export default function DataPage() {
    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)
    const [addr, setAddr] = useState("")

    // Request user's location access 
    useEffect(() => {
        // If browser supports location access requests 
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // remember the coordinates 
                (pos) => {setLat(pos.coords.latitude) 
                          setLon(pos.coords.longitude)},
                // user denied access 
                (err) => {console.log(err.message)}
            )
        }
    })

    // Geocoding to get the latitude from user input address 
    async function addrToLat(addr) {
        if (!addr) return 

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addr)}`
        try {
            const res = await fetch(url)
            const data = await res.json()

            if (data.length > 0) {
                setLat(data[0].lat)
                setLon(data[0].lon)
            } else {
                alert("This place does not exist")
            }

        } catch (err) {
            console.error(err)
        }
    }
    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold mb-4">Coordinate</h1>
            <div className="flex flex-col gap-3 w-[300px] mb-5"></div>
            <label className="font-normal">Enter your address:</label>
            <input 
                type="text"
                placeholder={lat ? `Lat: ${lat}` : "e.g. Kensington"}
                value={addr}
                onChange={(e) => setAddr(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addrToLat(addr)}
                className="border border-black px-3 py-2"
            />
            {lat && (
                <p className="mt-2">
                    Latitude of "<span className="font-bold">{addr}</span>":{parseFloat(lat).toFixed(2)}
                </p>
            )}
        </div>

    )

}