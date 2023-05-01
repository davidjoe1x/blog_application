import { ReactElement } from "react";
import { Sidebar, SinglePost } from "../../components";

import "./single.scss";

export const Single = (): ReactElement => {
  return (
    <div className="single">
      <div className="left">
        <SinglePost />
      </div>

      <div className="right">
        <Sidebar />
      </div>
    </div>
  );
};
