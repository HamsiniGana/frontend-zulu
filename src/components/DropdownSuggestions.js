import Dropdown from "react-bootstrap/Dropdown";

export default function DropdownSuggestions(props) {
  return (
    <Dropdown show={props.show}>
      <Dropdown.Menu
        style={{
          maxHeight: "10vh",
          overflowY: "auto",
          width: "51vh",
          background: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(12px)",
          borderRadius: "12px",
        }}
      >
        {props.plantSuggestions.length > 0 &&
          props.plantSuggestions.map((plant, index) => {
            return (
              <Dropdown.Item
                key={index}
                onClick={() => {
                  props.setPlant(plant);
                  props.setShow(false);
                }}
                className="text-center border-black border-solid border-white"
              >
                {plant}
              </Dropdown.Item>
            );
          })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
