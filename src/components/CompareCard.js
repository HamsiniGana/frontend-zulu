import Card from "react-bootstrap/Card";
import { plantAndImgMap } from "./plantsAndImagesMap";

export default function CompareCard(props) {
  return (
    <Card
      style={{
        width: "18rem",
        height: "50vh",
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(20px)",
        borderRadius: "1rem",
      }}
    >
      <div data-testid={`closable-tab-div-${props.plant_name}`}>
        <Card.Img
          variant="top"
          src={
            plantAndImgMap[props.plant_name.trim().toLowerCase()] !== undefined
              ? plantAndImgMap[props.plant_name.trim().toLowerCase()]
              : plantAndImgMap.default
          }
          style={{
            width: "15vw",
            height: "25vh",
            padding: "1vw",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </div>
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
        <div className="flex flex-row gap-2" data-testid="gavg-div">
          <p style={{ fontWeight: "bold" }}>Growth avg:</p>
          <p>{props.gavg}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="phavg-div">
          <p style={{ fontWeight: "bold" }}>Soil ph avg:</p>
          <p>{props.phavg}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="tavg-div">
          <p style={{ fontWeight: "bold" }}>Temp avg:</p>
          <p>{props.tavg}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="ravg-div">
          <p style={{ fontWeight: "bold" }}>Rainfall avg:</p>
          <p>{props.ravg}</p>
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
        {/* <Card.Text className="flex flex-row gap-2">
          <Card.Text style={{ fontWeight: "bold" }}>Biennial:</Card.Text>
          <Card.Text>{props.biennial}</Card.Text>
        </Card.Text> */}
        <div className="flex flex-row gap-2" data-testid="photo-div">
          <p style={{ fontWeight: "bold" }}>Photo:</p>
          <p>{props.photo}</p>
        </div>
        <div className="flex flex-row gap-2" data-testid="texture-div">
          <p style={{ fontWeight: "bold" }}>Texture:</p>
          <p>{props.texture}</p>
        </div>

        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
}
