import { ReactElement } from "react";
import { Link } from "react-router-dom";

import { PF } from "../../constans/pf";
import { PostsResponse } from "../../redux/features";

import "./post.scss";

interface PostProps {
  post: PostsResponse[0];
}

export const Post = ({ post }: PostProps): ReactElement => {
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <Link className="postLink" to={`/post/${post._id}`}>
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
        <p className="postDesc">{post.desc}</p>
      </div>
    </div>
  );
};
