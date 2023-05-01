import { ReactElement, useCallback, useEffect, useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

import { PF } from "../../constans/pf";
import { useAppDispatch, useAppSelector } from "../../redux";
import {
  deletePost,
  getPost,
  selectAuth,
  selectPost,
  updatePost,
} from "../../redux/features";

import "./singlepost.scss";

interface SinglePostState {
  updateMode: boolean;
  title: string;
  desc: string;
}

export const SinglePost = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { post } = useAppSelector(selectPost);

  const navigate = useNavigate();
  const { postId } = useParams();

  const [state, setState] = useState<SinglePostState>({
    updateMode: false,
    title: "",
    desc: "",
  });

  useEffect(() => {
    if (postId) {
      dispatch(getPost(postId));
    }
  }, [postId, dispatch]);

  useEffect(() => {
    if (post && (!state.desc || state.desc)) {
      setState((prev) => ({ ...prev, title: post.title, desc: post.desc }));
    }
  }, [post]);

  const handleDelete = async (): Promise<void> => {
    if (postId) {
      dispatch(deletePost(postId));
      navigate("/");
    }
  };

  const handleFormField = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      setState((prevState) => ({ ...prevState, [fieldName]: fieldValue }));
    },
    [setState]
  );

  const handleUpdate = async (): Promise<void> => {
    if (postId) {
      dispatch(
        updatePost({
          id: postId,
          title: state.title,
          desc: state.desc,
        })
      );
      setState((prev) => ({ ...prev, updateMode: false }));
    }
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post?.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="" />
        )}
        {state.updateMode ? (
          <input
            className="updateTitle"
            type="text"
            autoFocus
            name="title"
            value={state.title}
            onChange={handleFormField}
          />
        ) : (
          <h1 className="singlePostTitle">
            {state.title}
            {post?.username === user?.username && (
              <div className="singlePostEdit">
                <FaPen
                  className="singlePostIcon"
                  onClick={() =>
                    setState((prev) => ({ ...prev, updateMode: true }))
                  }
                />
                <FaTrash className="singlePostIcon" onClick={handleDelete} />
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Автор:
            <Link className="link" to={`/?user=${post?.username}`}>
              <b>{post?.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {post?.createdAt && new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {state.updateMode ? (
          <textarea
            className="updateDesc"
            name="desc"
            value={state.desc}
            onChange={handleFormField}
          />
        ) : (
          <p className="singlePostDesc">{state.desc}</p>
        )}
        {state.updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Обновить
          </button>
        )}
      </div>
    </div>
  );
};
