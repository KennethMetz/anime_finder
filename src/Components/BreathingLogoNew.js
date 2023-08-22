import { ReactComponent as SVG } from "../Styles/images/BreathingEdwardLogo.svg";
import { useChain, useSpring, useSpringRef, animated } from "@react-spring/web";

export default function BreathingLogo({ type }) {
  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: {
      duration: 800,
    },
    from: { scale: "70%" },
    to: [
      {
        scale: "100%",
      },
      { scale: "70%" },
    ],
    loop: true,
  });

  let height, width;
  useChain([springApi]);

  if (type === "handleButton") {
    height = "100px";
  } else if (type === "smallButton") {
    height = "40px";
  } else if (type === "fullPage") {
    height = "250px";
    width = "100%";
  } else if (type === "dataFromEdward") {
    height = "100%";
  }

  return (
    <div
      style={{
        height: height,
        width: width,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: type === "fullPage" ? "22vh 0px" : "0",
      }}
    >
      <animated.div
        style={{
          ...rest,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
      >
        <SVG width="100%" height="100%" />
      </animated.div>
    </div>
  );
}
