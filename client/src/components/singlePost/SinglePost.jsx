import { Link, useNavigate, useLocation } from "react-router-dom";
import "./singlepost.scss";
import { Context } from "../../components/context/Context";
import { useEffect, useState, useContext } from "react";
import http from "../../axios/axios";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setupdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await http.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await http.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      navigate("/");
    } catch (err) {}
  };

  const PF = "http://localhost:3001/images/";
  const { user } = useContext(Context);

  const handleUpdate = async () => {
    try {
      await http.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });

      setupdateMode(false);
    } catch (err) {}
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}{" "}
        {updateMode ? (
          <input
            className="updateTitle"
            type="text"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-regular fa-pen-to-square"
                  onClick={() => setupdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-solid fa-trash"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Автор:
            <Link className="link" to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {" "}
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="updateDesc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Обновить
          </button>
        )}
      </div>
    </div>
  );
}
