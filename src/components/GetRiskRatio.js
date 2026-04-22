
export default function getRiskRatio(plant) {
  if (!plant || !plant.plant_date) return 0

  const today = new Date()
  const planted = new Date(plant.plant_date)

  const diffTime = Math.abs(today - planted)
  const plantAge = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1)
  
  return (plant.total_risk || 0) / plantAge
}