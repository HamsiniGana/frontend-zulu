import CloseButton from "react-bootstrap/CloseButton";

export default function ClosableTabs(props) {
  return (
    <div className="flex flex-row justify-between bg-white/60 border border-solid border-black border-2 py-3 pl-3 rounded-2xl w-[165px] mx-3">
      <h5>{props.plant}</h5>
      <CloseButton
        style={{ paddingRight: "15px" }}
        onClick={() => {
          props.setPlants((prev) => {
            const plantFound = prev.find((p) => p === props.plant);
            if (plantFound) {
              return prev.filter((p) => p !== props.plant);
            } else {
              return prev;
            }
          });
          props.setPlantsInfo((prev) => {
            const plantFound = prev.find((p) => p.plant_name === props.plant);
            if (plantFound) {
              return prev.filter((p) => p.plant_name !== props.plant);
            } else {
              return prev;
            }
          });
        }}
      />
    </div>
  );
}
