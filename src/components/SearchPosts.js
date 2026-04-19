import { useState } from "react";
import plantBg from "../assets/bg-img.avif";
import RedditNavbar from "./RedditNavbar";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import axios from "axios";
import Post from "./Post";

export default function SearchPosts() {
  const [author, setAuthor] = useState("");
  const [subreddit, setSubreddit] = useState("");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(1);
  const [after, setAfter] = useState("");
  const [before, setBefore] = useState("");
  const [sort, setSort] = useState("asc");
  const [posts, setPosts] = useState([]);
  //   useEffect(() => {
  //     console.log(author);
  //     console.log(subreddit);
  //     console.log(query);
  //     console.log(limit);
  //     console.log(after);
  //     console.log(before);
  //     console.log(sort);
  //   }, [author, subreddit, query, limit, after, before, sort]);

  const searchPostsFn = async () => {
    const params = new URLSearchParams();
    if (author !== "") {
      params.append("author", author);
    }
    if (subreddit !== "") {
      params.append("subreddit", subreddit);
    }
    if (after !== "") {
      params.append("after", after);
    }
    if (before !== "") {
      params.append("before", before);
    }
    params.append("query", query);
    params.append("limit", limit);
    params.append("sort", sort);

    try {
      const res = await axios({
        method: "get",
        url: `https://215fbbb9u9.execute-api.us-east-1.amazonaws.com/v1/post/search?${params}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("reddit-token")}`,
        },
      });
    //   console.log(res);
      if (res.status === 200) {
        if (res.data.data.events.length === 0) {
          alert("No posts found");
        } else {
          setPosts(res.data.data.events);
        }
      }

      //   setPlantNameSuggestions(res.data);

      // console.log(res.data)
    } catch (e) {
      alert(e.response.data.error);
    }
  };

  return (
    <div
      className="flex flex-col"
      style={{
        backgroundImage: `url(${plantBg})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <RedditNavbar />
      <div className=" min-h-screen flex flex-col flex-grow">
        <div className="flex flex-row justify-center items-center">
          <div
            className="flex flex-col bg-white/30 mx-5 my-1 px-3 py-5
                        rounded-3xl bsort bsort-solid bsort-white border border-solid border-white"
            style={{ backdropFilter: "blur(10px)" }}
          >
            <h5 className="text-white p-1">Search filters</h5>
            <hr className="bsort bsort-solid bsort-white w-full" />
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Author:</Form.Label>
                <Form.Control
                  style={{ width: "200px" }}
                  type="text"
                  placeholder="Eg: john"
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Form.Group>
            </Form>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Subreddit:</Form.Label>
                <Form.Control
                  style={{ width: "200px" }}
                  type="text"
                  placeholder="Eg: worldnews"
                  onChange={(e) => setSubreddit(e.target.value)}
                />
              </Form.Group>
            </Form>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Query:</Form.Label>
                <Form.Control
                  style={{ width: "200px" }}
                  type="text"
                  placeholder="Eg: wuhan"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Form.Group>
            </Form>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Number of posts:</Form.Label>
                <Form.Control
                  style={{ width: "200px" }}
                  type="text"
                  placeholder="Eg: 3"
                  onChange={(e) => setLimit(e.target.value)}
                />
              </Form.Group>
            </Form>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">After:</Form.Label>
                <Form.Control
                  style={{ width: "200px" }}
                  type="date"
                  placeholder="Eg: 2019-12-30"
                  onChange={(e) => setAfter(e.target.value)}
                />
              </Form.Group>
            </Form>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Before:</Form.Label>
                <Form.Control
                  style={{ width: "200px" }}
                  type="date"
                  placeholder="Eg: 2019-12-30"
                  onChange={(e) => setBefore(e.target.value)}
                />
              </Form.Group>
            </Form>
            <div className="flex flex-col">
              <p className="text-white text-left">Ordering of posts:</p>
              <DropdownButton
                id="dropdown-basic-button"
                title={sort}
                variant="light"
              >
                <Dropdown.Item onClick={() => setSort("asc")}>
                  Asc
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSort("desc")}>
                  Desc
                </Dropdown.Item>
              </DropdownButton>
            </div>

            <div className="flex flex-row items-center">
              <button
                className="p-2 bg-dark-bottle-green text-white rounded-xl m-3 w-full"
                onClick={() => searchPostsFn()}
              >
                Search
              </button>
            </div>
          </div>

          {posts.length >= 1 && (
            <div className="flex flex-col gap-1 bg-white/20 p-2 rounded-xl m-2 border border-solid border-white" style={{backdropFilter: "blur(12px)"}}>
              {posts.map((p) => {
                return (
                  <Post
                    key={p.attributes.id}
                    id={p.attributes.id}
                    author={p.attributes.author}
                    createdAt={p.time_object.timestamp.slice(0, 10)}
                    title={p.attributes.title}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
