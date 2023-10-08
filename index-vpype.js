async function createGCode() {
  // const vpype = `vpype read myfirstdrawing.svg penwidth 0.3mm scaleto 19cm 19cm pagesize 20cmx20cm write myfirstdrawing-optimized.svg`;
  const vpype = `vpype read myfirstdrawing.svg penwidth 0.3mm scaleto 19cm 19cm pagesize 20cmx20cm gwrite --profile ninja myfirstdrawing-optimized.gcode`;

  const stl = await Bun.spawnSync([...vpype.split(" ")]);
  console.log("success", stl.success);
}

createGCode();
