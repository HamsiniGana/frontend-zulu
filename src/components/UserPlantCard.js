import { plantAndImgMap } from "./plantsAndImagesMap";  

export default function UserPlantCard({plant, onCalendar, onRisk}) {
  return (
    <div
      className="p-4 rounded-xl text-center shadow-xl"
      style={{ 
        background: "rgba(255, 255, 255, 0.5)",   
        backdropFilter: "blur(20px)"
      }}   
    >
      <img
        src={
          plantAndImgMap[plant.plant_name.trim().toLowerCase()] || 
          plantAndImgMap.default
        }
        alt={plant.plant_name}
        className="w-[140px] h-[140px] object-contain mx-auto mb-3"
      />
      <h3 className="font-bold">{plant.plant_name}</h3>
      <p className="text-sm">Planted: {plant.plant_date}</p>

      <div className="flex gap-2 mt-2 justify-center">
        <button
          onClick={onCalendar}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Calendar
        </button>

        <button
          onClick={onRisk}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Risk
        </button>
      </div>      
    </div>
    )
}