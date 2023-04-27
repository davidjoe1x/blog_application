import Post from "../post/Post";
import "./posts.scss";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

export default function Posts({ posts }) {
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
}
