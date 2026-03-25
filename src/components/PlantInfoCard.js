import Card from "react-bootstrap/Card";
import { plantAndImgMap } from "./plantsAndImagesMap";
import CloseButton from "react-bootstrap/CloseButton";

export default function PlantInfoCard(props) {
  return (
    <Card
      style={{
        width: "25rem",
        height: "60vh",
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(20px)",
        borderRadius: "1rem",
      }}
    >
      <div className="flex flex-row justify-end">
        <CloseButton
          className="px-3 pt-4"
          onClick={() => {
            props.setListPlant("");
            props.setListPlantInfo({});
          }}
        />
      </div>
      {/* <div> */}
      <Card.Img
        variant="top"
        src={
          plantAndImgMap[props.plant_name.trim().toLowerCase()] !== undefined
            ? plantAndImgMap[props.plant_name.trim().toLowerCase()]
            : plantAndImgMap.default
        }
        style={{
          width: "20vw",
          height: "30vh",
          padding: "1vw",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      {/* </div> */}
      <Card.Body style={{ overflowY: "auto" }}>
        <Card.Title className="text-center">
          {props.plant_name.toUpperCase()}
        </Card.Title>
        <Card.Title className="text-center" style={{ fontSize: "12px" }}>
          ________________
        </Card.Title>
        <div className="flex flex-row gap-2">
          <p style={{ fontWeight: "bold" }}>Attributes:</p>
          <p>{props.attributes}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p style={{ fontWeight: "bold" }}>Category:</p>
          <p>{props.category}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p style={{ fontWeight: "bold" }}>Climate zone:</p>
          <p>{props.cliz}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p style={{ fontWeight: "bold" }}>Gmax:</p>
          <p>{props.gmax}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p style={{ fontWeight: "bold" }}>Gmin:</p>
          <p>{props.gmin}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p style={{ fontWeight: "bold" }}>Ktmp:</p>
          <p>{props.ktmp}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p style={{ fontWeight: "bold" }}>Ktmpr:</p>
          <p>{props.ktmpr}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p style={{ fontWeight: "bold" }}>Life form:</p>
          <p>{props.life_form}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p style={{ fontWeight: "bold" }}>Life span:</p>
          <p>{props.life_span}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p style={{ fontWeight: "bold" }}>Phmax:</p>
          <p>{props.phmax}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p style={{ fontWeight: "bold" }}>Phmin:</p>
          <p>{props.phmin}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p style={{ fontWeight: "bold" }}>Ropmn:</p>
          <p>{props.ropmn}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p style={{ fontWeight: "bold" }}>Ropmx:</p>
          <p>{props.ropmx}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p style={{ fontWeight: "bold" }}>Topmn:</p>
          <p>{props.topmn}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p style={{ fontWeight: "bold" }}>Topmx:</p>
          <p>{props.topmx}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p style={{ fontWeight: "bold" }}>Photo:</p>
          <p>{props.photo}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p style={{ fontWeight: "bold" }}>Texture:</p>
          <p>{props.texture}</p>
        </div>
      </Card.Body>
    </Card>
  );
}
