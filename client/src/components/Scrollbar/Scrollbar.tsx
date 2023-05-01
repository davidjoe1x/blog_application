import { motion } from "framer-motion";
import { ReactElement, useEffect } from "react";
import { A11y, Autoplay, Scrollbar as SwiperScrollBar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useAppDispatch, useAppSelector } from "../../redux";
import { getScrollbarList, selectScrollbar } from "../../redux/features";
import { fadeIn } from "../../variants";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./scrollbar.scss";

export const Scrollbar = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { list, isFetching } = useAppSelector(selectScrollbar);

  useEffect(() => {
    if (!list.length && !isFetching) {
      dispatch(getScrollbarList());
    }
  }, [list, isFetching, dispatch]);

  return (
    <motion.div
      className="slider"
      variants={fadeIn("top", 0.2)}
      initial="hidden"
      whileInView={"show"}
    >
      <Swiper
        modules={[Autoplay, SwiperScrollBar, A11y]}
        spaceBetween={50}
        slidesPerView={5}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {list.map((data) => (
          <SwiperSlide key={data.id}>
            <div className="slide-wrap">
              <div className="swiper-slide" key={data.id}>
                <h1 className="swiper-title">{data.title}</h1>
                <img className="slider-img" src={data.url} alt=""></img>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};
