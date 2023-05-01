import { motion } from "framer-motion";
import { ReactElement } from "react";

import { PostsResponse } from "../../redux/features";
import { fadeIn } from "../../variants";
import { Post } from "../Post";

import "./posts.scss";

interface PostsProps {
  posts: PostsResponse;
}

export const Posts = ({ posts }: PostsProps): ReactElement => {
  return (
    <motion.div
      className="posts"
      variants={fadeIn("right", 0.2)}
      initial="hidden"
      whileInView={"show"}
    >
      {posts.map((p, k) => (
        <Post key={k} post={p} />
      ))}
    </motion.div>
  );
};
