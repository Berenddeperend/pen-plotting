import { useState } from "react";
import "./App.css";
import { interpolate, range } from "d3";

const steps = 20;
const multiplier = 300;

const a = [0, 0];
const b = [1, 0];
const c = [2, 0];
const d = [2, 1];
const e = [2, 2];
const f = [1, 2];
const g = [0, 2];
const h = [0, 1];

const Bezier = ({ points }) => {
  // console.log(points);
  // return [0, 1, 2, 3, 4, 5].map((item) => item);

  const lines = range(steps).map((i) => {
    const pointA = points[0];
    const pointB = points[1];
    const pointC = points[2];

    return (
      <line
        x1={interpolate(pointA[0], pointB[0])(i / steps) * multiplier}
        y1={interpolate(pointA[1], pointB[1])(i / steps) * multiplier}
        x2={interpolate(pointB[0], pointC[0])(i / steps) * multiplier}
        y2={interpolate(pointB[1], pointC[1])(i / steps) * multiplier}
        stroke={"orange"}
      ></line>
    );
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
        <Bezier points={[h, a, b]} />
        <Bezier points={[b, c, d]} />
        <Bezier points={[d, e, f]} />
        <Bezier points={[f, g, h]} />
      </svg>
    </>
  );
}
// 00 01 02
// 10 11 12
// 20 21 22

export default App;
