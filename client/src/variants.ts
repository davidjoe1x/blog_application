type Direction = "top" | "bottom" | "left" | "right";

export const fadeIn = (direction: Direction, delay: number) => {
  return {
    hidden: {
      y: direction === "top" ? 80 : direction === "bottom" ? -80 : 0,
      opacity: 0,
      x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 1.2,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};
