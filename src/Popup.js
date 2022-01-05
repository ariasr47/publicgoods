import { useMemo } from "react";
import Overlay from "./Overlay";

const Popup = (props) => {
  const {
    children,
    width = "300px",
    height = "400px",
    show = true,
    slideDuration = 500,
    direction = "down",
  } = props;

  const styles = useMemo(
    () => ({
      width: width,
      height: height,
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    }),
    [width, height]
  );

  return (
    <Overlay show={show} slideDuration={slideDuration} direction={direction}>
      <div style={styles}>{children}</div>
    </Overlay>
  );
};

export default Popup;
