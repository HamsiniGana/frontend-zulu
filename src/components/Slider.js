import Form from "react-bootstrap/Form";

export default function Slider(props) {
  return (
    <div>
      <Form.Label className="text-white">{props.label}</Form.Label>
      <Form.Range min={props.min} max={props.max} step={props.step} defaultValue={props.defaultValue} onChange={(e) => props.setState(e.target.value)} className="custom-slider"/>
      <div className="flex flex-row justify-between">
        <span className="text-white">{props.min}</span>
        <span className="text-white">{props.max}</span>
      </div>
    </div>
  );
}
