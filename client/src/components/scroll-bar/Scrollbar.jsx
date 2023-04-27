// import Swiper core and required modules
import { Autoplay, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./scrollbar.scss";

import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setDate] = useState([]);

  useEffect(() => {
    axios
      .get("https://63e4b4cb4474903105efeb33.mockapi.io/pint/blog-swiper")
      .then((res) => {
        setDate(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const arr = data.map((data, index) => {
    return (
      <div className="swiper-slide">
        <h1 className="swiper-title">{data.title}</h1>
        <img className="slider-img" src={data.url} alt=""></img>
      </div>
    );
  });

  return (
    <>
      <motion.div
        className="slider"
        variants={fadeIn("top", 0.2)}
        initial="hidden"
        whileInView={"show"}
      >
        <Swiper
          modules={[Autoplay, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={5}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <div className="slide-wrap">{arr[7]}</div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-wrap">{arr[0]}</div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide-wrap">{arr[1]}</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-wrap">{arr[2]}</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-wrap">{arr[3]}</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-wrap">{arr[4]}</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-wrap">{arr[5]}</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-wrap">{arr[6]}</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-wrap">{arr[7]}</div>
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </>
  );
}
export default App;
