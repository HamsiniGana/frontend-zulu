import Card from "react-bootstrap/Card";
import { plantAndImgMap } from "./plantsAndImagesMap";
import CloseButton from "react-bootstrap/CloseButton";

export default function PlantInfoCard(props) {
  return (
    <Card
      style={{
        width: "25rem",
        height: "57vh",
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(20px)",
        borderRadius: "1rem",
      }}
    >
      <div className="flex flex-row justify-end">
        <CloseButton
          className="px-3 pt-3"
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
          padding: "0.5vw",
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
        <div className="flex flex-row gap-2" data-testid="attributes-div">
          <p style={{ fontWeight: "bold" }}>Attributes:</p>
          <p>{props.attributes}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="category-div">
          <p style={{ fontWeight: "bold" }}>Category:</p>
          <p>{props.category}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="cliz-div">
          <p style={{ fontWeight: "bold" }}>Climate zone:</p>
          <p>{props.cliz}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="gmax-div">
          <p style={{ fontWeight: "bold" }}>Gmax:</p>
          <p>{props.gmax}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="gmin-div">
          <p style={{ fontWeight: "bold" }}>Gmin:</p>
          <p>{props.gmin}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="ktmp-div">
          <p style={{ fontWeight: "bold" }}>Ktmp:</p>
          <p>{props.ktmp}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="ktmpr-div">
          <p style={{ fontWeight: "bold" }}>Ktmpr:</p>
          <p>{props.ktmpr}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="life-form-div">
          <p style={{ fontWeight: "bold" }}>Life form:</p>
          <p>{props.life_form}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="life-span-div">
          <p style={{ fontWeight: "bold" }}>Life span:</p>
          <p>{props.life_span}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="phmax-div">
          <p style={{ fontWeight: "bold" }}>Phmax:</p>
          <p>{props.phmax}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="phmin-div">
          <p style={{ fontWeight: "bold" }}>Phmin:</p>
          <p>{props.phmin}</p>
        </div> 
        <div className="flex flex-row gap-2" data-testid="ropmn-div">
          <p style={{ fontWeight: "bold" }}>Ropmn:</p>
          <p>{props.ropmn}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="ropmx-div">
          <p style={{ fontWeight: "bold" }}>Ropmx:</p>
          <p>{props.ropmx}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="topmn-div">
          <p style={{ fontWeight: "bold" }}>Topmn:</p>
          <p>{props.topmn}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="topmx-div">
          <p style={{ fontWeight: "bold" }}>Topmx:</p>
          <p>{props.topmx}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="photo-div">
          <p style={{ fontWeight: "bold" }}>Photo:</p>
          <p>{props.photo}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="texture-div">
          <p style={{ fontWeight: "bold" }}>Texture:</p>
          <p>{props.texture}</p>
        </div>
      </Card.Body>
    </Card>
  );
}
