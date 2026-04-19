import human from "../assets/human.png";
export default function Post(props) {
  return (
    <div className="flex flex-row p-3 border border-solid border-white bg-white/30 rounded-xl m-2 gap-4 items-center">
      <img src={human} alt="profile-icon" style={{width: "100px", height: "100px"}}/>
      <div className="flex flex-col">
        <p>Author: {props.author}</p>
        <p>Created at: {props.createdAt}</p>
        <p>Title: {props.title}</p>
      </div>
    </div>
  );
}
