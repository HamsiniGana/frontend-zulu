import { plantAndImgMap } from "./plantsAndImagesMap"
import { useState } from "react"

export default function CalendarCard({water, tempEvents = [], plant, onSave}) {
  const [monthOffset, setMonthOffset] = useState(0)

  if (!water || water.length === 0) return null

  const plantImage =
  plantAndImgMap[plant?.trim().toLowerCase()] ||
  plantAndImgMap["default"]
  
  const wateringDates = water.map((d) => new Date(d))

  let start = wateringDates[0];
  for (let i = 1; i < wateringDates.length; i++) {
    if (wateringDates[i].getTime() < start.getTime()) {
      start = wateringDates[i];
    }
  }
  const startDate = start;

  const currentDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + monthOffset, 
  )

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const monthString = currentDate.toLocaleString("default", {month: "long"})

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  const tempDates = tempEvents.map((t) => ({
    date: new Date(t.date), status: t.status
  }))

  const isWateringDay = (day) => {
    return wateringDates.some((date) => 
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day 
    )
  }

  const getTempStatus = (day) => {
    const dates = tempDates.find((t) => 
    t.date.getFullYear() === year && 
    t.date.getMonth() === month &&
    t.date.getDate() === day
    )
    return dates?.status || null
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

      {/* plant image map */}
      <div className="flex flex-col items-center">
      <img
          src={plantImage}
          alt={plant}
          className="w-[200px] h-[200px]"
      />
      <p className="text-white mt-2 capitalize">{plant}</p>

      {onSave && (
        <button 
          onClick={onSave}
          className="bg-green-600 text-white px-4 py-2 rounded-xl
          hover:!bg-green-200 hover:!text-black hover:!border-green-800 transition">
            Save Calendar
        </button>
      )}
      </div>

      {/* calendar dispaly */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-4 w-full">
          <button
            disabled={monthOffset === 0}
            onClick={() => setMonthOffset(prev => prev - 1)}
            className="text-lg px-2 py-1 bg-grey-200 rounded hover:bg-grey-300 disabled:opacity-25">
              ←
            </button>
            <div className="font-bold text-lg">
              {monthString} {year}
            </div>

            <button
              disabled={!spilloverWateringDates}
              onClick={() => setMonthOffset(prev => prev + 1)}
              className="text-lg px-2 py-1 bg-grey-200 rounded hover:bg-gray-300 disabled:opacity-25"
            >
              →
            </button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center font-bold mb-2">
            <div>Sun</div><div>Mon</div><div>Tue</div>
            <div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
        </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          const isWater = day && isWateringDay(day)
          const temp = day && getTempStatus(day)
          return (
            <div
              key={index}
              className={`w-10 h-10 flex flex-col items-center justify-center rounded-full
              ${isWater
                ? "bg-blue-500 text-white font-bold"
                : "text-black"
              }`}
            >
              {day && (
              <>
                <span>{day}</span>
                {temp === "hot" && <span className="text-xs">🔥</span>}
                {temp === "cold" && <span className="text-xs">❄️</span>}
              </>
              )}
            </div>
            )
        })}
        </div>
      
      <div className="text-sm mt-3 text-center space-y-1">
        <p>🔵 Best days to water your {plant}</p>
        <p>🔥 Too hot</p>
        <p>❄️ Too cold</p>
      </div>
      
    </div>
  </div>
  )
}