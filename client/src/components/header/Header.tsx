import { motion } from "framer-motion";
import { ReactElement } from "react";

import { HeadImage } from "../../images";
import { fadeIn } from "../../variants";
import { Scrollbar } from "../Scrollbar";

import "./header.scss";

export const Header = (): ReactElement => {
  return (
    <motion.div
      className="header"
      variants={fadeIn("top", 0.2)}
      initial="hidden"
      whileInView={"show"}
    >
      <img className="headerImg" src={HeadImage} alt="" />
      <Scrollbar />
    </motion.div>
  );
};
