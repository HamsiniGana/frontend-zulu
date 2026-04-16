import { plantAndImgMap } from "./plantsAndImagesMap"
import { useState } from "react"

export default function CalendarCard({ water, plant }) {
    const [monthOffset, setMonthOffset] = useState(0)

    if (!water || water.length === 0) return null

    const plantImage =
    plantAndImgMap[plant.trim().toLowerCase()] ||
    plantAndImgMap["default"]

    const today = new Date()
    const currentDate = new Date(
        today.getFullYear(),
        today.getMonth() + monthOffset, 
    )

    const year = today.getFullYear()
    const month = today.getMonth()
    const monthString = today.toLocaleString("default", {month: "long"})

    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDay = new Date(year, month, 1).getDay()

    const wateringDates = water.map((d) => new Date(d))

    const isWateringDay = (day) => {
        return wateringDates.some((date) => {
            return (
                date.getFullYear() === year &&
                date.getMonth() === month &&
                date.getDate() === day 
            )
        })
    }
    
    const spilloverWateringDates = wateringDates.some((date) => {
        const nextMonthDate = new Date(year, month + 1, 1)
        return (
            date.getFullYear() === nextMonthDate.getFullYear() &&
            date.getMonth() === nextMonthDate.getMonth()
        )
    })

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
            <div className="flex items-center justify-center gap-3 mb-4">
                <div className="text-center font-bold text-lg mb-4">
                    {monthString} {year}
                </div>

                {spilloverWateringDates && (
                    <button
                    onClick={() => setMonthOffset(monthOffset + 1)}
                    className="text-lg px-2 py-1 bg-grey-200 rounded hover:bg-gray-300"
                    >
                        →          
                    </button>
                )}

                {monthOffset > 0 && (
                    <button
                    onClick={() => setMonthOffset(monthOffset - 1)}
                    className="text-lg px-2 py-1 bg-grey-200 rounded hover:bg-grey-300"
                    >
                        ←
                    </button>
                )}
            </div>
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