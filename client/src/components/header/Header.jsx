import "./header.scss";
import "../header/head.jpeg";
import Scrollbar from "../scroll-bar/Scrollbar";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

export default function Header() {
  return (
    <motion.div
      className="header"
      variants={fadeIn("top", 0.2)}
      initial="hidden"
      whileInView={"show"}
    >
      <img
        className="headerImg"
        src="http://localhost:3001/images/head.jpeg"
        alt=""
      />
      <Scrollbar />
    </motion.div>
  );
}
