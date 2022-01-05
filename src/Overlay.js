import { useState, useEffect, useMemo } from "react";

const Overlay = (props) => {
  const { children, show, slideDuration, direction } = props;

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const styles = useMemo(
    () => ({
      width: "100%",
      height: ready & show ? "100%" : "0px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: "0px",
      overflow: "hidden",
      transition: `all ${slideDuration}ms ease`,
      zIndex: 9999,
    }),
    [ready, show, slideDuration]
  );

  return <div style={styles}>{children}</div>;
};

export default Overlay;
