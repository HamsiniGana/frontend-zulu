// get the ratio of total risk to plant age in days
export function GetRiskRatio(plant) {
  if (!plant || !plant.plant_date) return 0

  const today = new Date()
  const planted = new Date(plant.plant_date)

  const diffTime = Math.abs(today - planted)
  const plantAge = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1)
  
  return (plant.total_risk || 0) / plantAge
}

// risk insight in words 
export function GetRiskInsight(plant, ratio) {
  if (ratio < 0.3) return {label: "The environment is ideal", colour: "text-green-600"}
  if (ratio > 0.5) return {label: "The environment is at risk", colour: "text-yellow-600"}
 
  return {label: "The environment is NOT ideal", colour: "text-red-600"}
}

// sort from highest to lowest risk ratio and return the first one
export function GetMostSensitive(plants, GetRiskRatio) {
  if (plants.length === 0) return null

  return [...plants].sort((a, b) => GetRiskRatio(b) - GetRiskRatio(a))[0]
}