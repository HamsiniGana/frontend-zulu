import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export default function DataLandingPageCards(props) {
    const nav = useNavigate()
  return (
    <Card
      style={{
        flex: "1 1 0px",
        minWidth: "0",
        marginBottom: "4vh",
        background: "rgba(158, 237, 136, 0.3)",
        backdropFilter: "blur(5px)",
      }}
      className=""
    >
      <Card.Img variant="top" src={props.img} alt={props.alt} className="p-4 w-full h-auto aspect-square object-contain"/>
      <Card.Body>
        <Card.Title className="text-white">{props.title}</Card.Title>
        <Card.Text className="font-bold h-[15vh] text-sm">
          {props.description}
        </Card.Text>
        <Button
          className="hover:!text-black hover:!bg-white"
          style={{
            backgroundColor: "var(--dark-bottle-green)",
            borderColor: "var(--dark-bottle-green)",
            borderWidth: "2px",
          }}
          onClick={() => nav(`${props.navLink}`)}
        >
          Get started
        </Button>
      </Card.Body>
    </Card>
  );
}
