import "./App.css";
import { interpolate, range } from "d3";

const steps = 36;
const multiplier = 10;

const Squares = () => {
  // console.log(points);
  // return [0, 1, 2, 3, 4, 5].map((item) => item);

  const lines = range(steps + 1).map((i) => {
    return (
      <>
        <rect
          x={((steps - i) / 2) * multiplier}
          y={((steps - i) / 2) * multiplier}
          width={i * multiplier}
          height={i * multiplier}
          transform={`rotate(${i * 0.5})`}
          transform-origin={`${(steps / 2) * multiplier} ${
            (steps / 2) * multiplier
          }`}
          fill="transparent"
          stroke={"orange"}
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
        id="svg"
        xmlns="http://www.w3.org/2000/svg"
        width="2000"
        height="2000"
        viewBox="-100 -100 2000 2000"
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
