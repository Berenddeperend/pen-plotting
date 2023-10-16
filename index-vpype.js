async function createGCode() {
  const vpype = `vpype --config configs/plotter.toml read svg/myfirstdrawing.svg linemerge linesort penwidth 0.3mm scaleto 19cm 19cm pagesize 20cmx20cm gwrite -p plotter gcode/myfirstdrawing-optimized.gcode`;
  // const vpype = `vpype --config configs/plotter.toml read svg/myfirstdrawing.svg penwidth 0.3mm scaleto 19cm 19cm pagesize 20cmx20cm write svg/myfirstdrawing-besnaveld.svg`;

  const stl = await Bun.spawnSync([...vpype.split(" ")]);
  console.log("success", stl.success);
}

createGCode();
