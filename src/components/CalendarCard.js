import { plantAndImgMap } from "./plantsAndImagesMap"

export default function CalendarCard({ water, plant }) {
    if (!water || water.length === 0) return null

    // Plant image
    const plantImage =
    plantAndImgMap[plant.trim().toLowerCase()] ||
    plantAndImgMap["default"]

    // Calendar logic
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()

    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()

    // Convert backend dates
    const wateringDates = water.map((d) => new Date(d).toDateString())

    const isWateringDay = (day) => {
    const date = new Date(year, month, day).toDateString()
    return wateringDates.includes(date)
    }

    // Build calendar grid
    const calendarDays = []

    for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
    }

    for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d)
    }

    return (
    <div className="mt-10 flex flex-col md:flex-row gap-10 items-center justify-center">

        {/* IMAGE */}
        <div className="flex flex-col items-center">
        <img
            src={plantImage}
            alt={plant}
            className="w-[200px] h-[200px]"
        />
        <p className="text-white mt-2 capitalize">{plant}</p>
        </div>

        {/* CALENDAR */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="grid grid-cols-7 gap-2 text-center font-bold mb-2">
            <div>Sun</div><div>Mon</div><div>Tue</div>
            <div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
        </div>

        <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
            <div
                key={index}
                className={`w-10 h-10 flex items-center justify-center rounded-full
                ${day && isWateringDay(day)
                    ? "bg-blue-500 text-white font-bold"
                    : "text-black"
                }`}
            >
                {day || ""}
            </div>
            ))}
        </div>

        <p className="text-sm mt-3 text-center">
            Blue = Best days to water your {plant}
        </p>
        </div>
    </div>
    )
}