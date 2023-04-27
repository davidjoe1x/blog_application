import { useState, useContext } from "react";
import "./write.scss";
import { Context } from "../../components/context/Context";
import http from "../../axios/axios";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await http.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await http.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}

      <form onSubmit={handleSubmit} className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            className="fileInput"
            type="file"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            autoFocus={true}
            type="text"
            placeholder="Заголовок поста"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Текст поста"
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="writeSubmit">
          Опубликовать
        </button>
      </form>
    </div>
  );
}
