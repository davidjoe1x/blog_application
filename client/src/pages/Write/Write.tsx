import { PayloadAction } from "@reduxjs/toolkit";
import { ReactElement, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../redux";
import {
  CreatePostRequest,
  PostResponse,
} from "../../redux/features/post/post.interface";
import { createPost } from "../../redux/features/post/post.slice";
import { uploadImage } from "../../redux/features/upload/upload.slice";
import "./write.scss";

export const Write = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [file, setFile] = useState<File | null | undefined>(null);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const newPost: CreatePostRequest = {
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      dispatch(uploadImage(data));
      setFile(null);
    }
    const res: PayloadAction<
      PostResponse,
      string,
      {
        arg: CreatePostRequest;
        requestId: string;
        requestStatus: "fulfilled";
      },
      never
    > = (await dispatch(createPost(newPost))) as any;
    if (res.payload?._id) {
      navigate(`/post/${res.payload._id}`);
    }
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}

      <form onSubmit={handleSubmit} className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <FaPlus className="writeIcon" />
          </label>
          <input
            className="fileInput"
            type="file"
            id="fileInput"
            onChange={(e) => {
              setFile(e.target.files?.[0]);
            }}
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
};
