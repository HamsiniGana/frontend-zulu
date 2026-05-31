import human from "../assets/human.png";
import { useState } from "react";
import axios from "axios";

export default function Post(props) {
  const [view, setView] = useState(false);
  const [comments, setComments] = useState([]);

  const commentsFn = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:8000/v1/post/comments?link_id=${props.id}&limit={5}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("reddit-token")}`,
        },
      });
      console.log(res);
      if (res.status === 200) {
        if (res.data.data.events.length === 0) {
          setComments(["No comments"]);
        } else {
          setComments(res.data.data.events);
        }
      }
    } catch (e) {
      alert(e.response.data.error);
    }
  };
  return (
    <div className="flex flex-row p-3 border border-solid border-white bg-white/30 rounded-xl m-2 gap-4 items-center">
      <img
        src={human}
        alt="profile-icon"
        style={{ width: "100px", height: "100px" }}
      />
      <div className="flex flex-col w-full">
        <p>Author: {props.author}</p>
        <p>Created at: {props.createdAt}</p>
        <p>Title: {props.title}</p>
        <div className="flex flex-col justify-end w-full">
          <p
            className="text-white underline"
            onClick={() => {
              if (view) {
                setView(false);
              } else {
                commentsFn();
                setView(true);
              }
            }}
          >
            View comments
          </p>
          {view === true && comments[0] === "No comments" && (
            <div className="bg-white/20 rounded-xl border border-solid border-white p-2">
              <p className="m-2">{"No comments"}</p>
            </div>
          )}

          {view === true && comments[0] !== "No comments" && (
            <div>
              {comments.map((c, index) => {
                return (
                  <div
                    className="flex flex-col m-2 bg-white/20 rounded-xl border border-solid border-white p-2 gap-2"
                    key={index}
                  >
                    <p>Author: {c.attributes.author}</p>
                    <p>Commented at: {c.time_object.timestamp.slice(0, 10)}</p>
                    <p>Comment: {c.attributes.body}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
