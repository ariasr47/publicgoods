import Popup from "./Popup";
import { useState, useCallback } from "react";
import catImage from "./images/cat-img.jpeg";

let count = sessionStorage.getItem("timesClosed");
count = count ? Number(count) : 0;

function App() {
  const [show, setShow] = useState(count < 2);
  const [catFacts, setCatFacts] = useState([]);

  const fetchCatFacts = useCallback(async () => {
    try {
      const res = await fetch("https://cat-fact.herokuapp.com/facts");
      if (res.statusCode < 200 && res.statusCode > 299)
        throw new Error(res.statusCode + " " + res.statusMessage);
      const facts = await res.json();
      setCatFacts(facts);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const handleClose = useCallback(() => {
    setShow(false);
    sessionStorage.setItem("timesClosed", count + 1);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <Popup width="600px" height="400px" show={show} slideDuration={500}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                width: "50%",
                height: "100%",
                backgroundImage: `url(${catImage})`,
                backgroundSize: "cover",
                backgroundPosition: "bottom",
              }}
            />
            <div
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  padding: "0.5rem",
                  flexDirection: "row-reverse",
                }}
              >
                <button
                  onClick={handleClose}
                  style={{
                    border: "none",
                    backgroundColor: "white",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                  }}
                >
                  X
                </button>
              </div>
              <div
                style={{
                  flexGrow: 1,
                }}
              >
                <h1
                  style={{ textAlign: "center", margin: "0.5rem 0 0.5rem 0" }}
                >
                  Cat Facts
                </h1>
                <ol style={{ fontSize: "0.75rem", paddingLeft: "1rem" }}>
                  {catFacts.map(({ _id, text }, index) => (
                    <li
                      key={_id}
                      style={{
                        paddingBottom:
                          index + 1 !== catFacts.length ? "0.25rem" : undefined,
                      }}
                    >
                      {text}
                    </li>
                  ))}
                </ol>
              </div>
              <div
                style={{
                  display: "flex",
                  paddingBottom: "1.5rem",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={fetchCatFacts}
                  style={{
                    width: "90%",
                    backgroundColor: "black",
                    color: "white",
                    border: "none",
                    fontWeight: "bold",
                    padding: "0.5rem 0 0.5rem 0 ",
                  }}
                >
                  GET FACTS
                </button>
              </div>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default App;
