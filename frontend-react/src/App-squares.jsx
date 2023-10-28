import { useState } from "react";
import "./App.css";
import { interpolate, range } from "d3";

const steps = 20;
const multiplier = 300;

const Squares = () => {
  // console.log(points);
  // return [0, 1, 2, 3, 4, 5].map((item) => item);

  const lines = range(steps + 1).map((i) => {
    return <rect x="0" width={i * multiplier} stroke={"orange"}></rect>;
  });

  return lines;
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <svg
        id="svg"
        xmlns="http://www.w3.org/2000/svg"
        width="2000"
        height="2000"
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
