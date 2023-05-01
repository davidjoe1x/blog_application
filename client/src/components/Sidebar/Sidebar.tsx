import { motion } from "framer-motion";
import { ReactElement } from "react";

import { CarImage } from "../../images";
import { fadeIn } from "../../variants";

import "./sidebar.scss";

export const Sidebar = (): ReactElement => {
  return (
    <motion.div
      className="sidebar"
      variants={fadeIn("left", 0.2)}
      initial="hidden"
      whileInView={"show"}
    >
      <div className="sidebarItem">
        <span className="sidebarTitle">Актуальное</span>

        <img className="sidebarImg" src={CarImage} alt="" />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam
          labore a at blanditiis odio vitae nulla repellendus tempora facere
          quisquam veniam facilis sequi deleniti quos, quaerat amet sapiente
          laudantium magnam?
        </p>
      </div>
    </motion.div>
  );
};
