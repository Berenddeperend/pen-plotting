import "./App.css";
import { interpolate, range } from "d3";

const steps = 20;
const multiplier = 20;

const Squares = () => {
  // console.log(points);
  // return [0, 1, 2, 3, 4, 5].map((item) => item);

  const lines = range(steps + 1).map((i) => {
    // translate(${((steps - i) / 2) * multiplier} ${
    //   ((steps - i) / 2) * multiplier
    // })

    return (
      <>
        <rect
          y={i * -0.25 * multiplier}
          x={i * 0.25 * multiplier}
          width={i * multiplier}
          height={i * multiplier}
          transform={`
          rotate(${i * 2})
          translate(${((steps - i) / 2) * multiplier} ${
            ((steps - i) / 2) * multiplier
          })`}
          fill="transparent"
          stroke={"orange"}
          // strokeWidth={"4mm"}
        ></rect>
      </>
    );
  });

  return lines;
};

function App() {
  return (
    <>
      <svg
        style={{ border: "1px solid red" }}
        id="svg"
        xmlns="http://www.w3.org/2000/svg"
        width="2000"
        height="2000"
        viewBox={"-400 -400 2000 2000"}
      >
        <Squares />
      </svg>
    </>
  );
}
// 00 01 02
// 10 11 12
// 20 21 22

export default App;
