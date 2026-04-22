import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";

// irrigation statistics on line graph 
export function IrrigationGraph({ plant }) {

  if (!plant?.irrigation_dates?.length) return null

  const irrigationStat = {}
  const year = new Date(plant.irrigation_dates[0]).getFullYear() 
  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
  ]

  plant.irrigation_dates.forEach(date => {
    const d = new Date(date)
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`
    irrigationStat[key] = (irrigationStat[key] || 0) + 1
  })

  const data = monthNames.map((m, i) => {
    const key = `${year}-${String(i+1).padStart(2,"0")}`
    return {
      month: m,
      waterCount: irrigationStat[key] || 0
    }
  })

  return (
    <div
      className="p-6 rounded-xl"
      style={{
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(20px)"
      }}
    >
      <h2 className="text-xl font-bold mb-4 text-center">{plant.plant_name} - Monthly Watering Guide</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart 
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
        >
          <XAxis 
            dataKey="month" 
            label={{value: 'Month', position: 'insideBottom', offset: -25}}
          />
          <YAxis 
            allowDecimals={false} 
            label={{ 
              value: 'Watering Count', 
              angle: -90, 
              position: 'insideLeft', 
              textAnchor: "middle" 
            }}
            />
          <Tooltip />
          <Line type="monotone" dataKey="waterCount" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// temperature bar graph
export function TemperatureGraph({ plants }) {

  if (!plants?.length) return null;

  const tempStat = {};
  const startEvent = plants[0]?.temp_events?.[0];
  const year = startEvent
    ? new Date(startEvent.date).getFullYear()
    : new Date().getFullYear();
  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  for (let i = 0; i < 12; i++) {
    const key = `${year}-${String(i + 1).padStart(2, "0")}`;
    tempStat[key] = { hot: 0, cold: 0 };
  }

  plants.forEach(p => {
    (p.temp_events || []).forEach(event => {
      const d = new Date(event.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

      if (tempStat[key]) {
        if (event.status === "hot") tempStat[key].hot++;
        if (event.status === "cold") tempStat[key].cold++;
      }
    });
  });

  const data = monthNames.map((month, i) => {
    const key = `${year}-${String(i + 1).padStart(2, "0")}`;
    return {
      month,
      hot: tempStat[key].hot,
      cold: tempStat[key].cold
    };
  });

  return (
    <div
      className="p-6 rounded-xl"
      style={{
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(20px)"
      }}
    >
      <h2 className="text-xl font-bold mb-4 text-center">{plants[0].plant_name} - Monthly Temperature Risk</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
        >
          <XAxis
            dataKey="month"
            label={{value: "Month", position: "insideBottom", offset: -20}}
          />
          <YAxis
            allowDecimals={false}
            label={{
              value: "Number of Risks",
              angle: -90,
              position: "insideLeft",
              textAnchor: "middle"
            }}
          />
          <Tooltip />
            <Legend verticalAlign="top" align="right"/>
            <Bar dataKey="hot" fill="red" name="Hot Days"/>
            <Bar dataKey="cold" fill="blue" name="Cold Days"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
