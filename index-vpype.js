// Deze settings werken goed voor A5 vierkant in het midden!
// linemerge penwidth 0.4mm scaleto 10cm 10cm layout 22x22cm translate 5cm 1cm

async function createGCode() {
  // const vpype = `vpype --config configs/plotter.toml read svg/bezier.svg penwidth 0.3mm scaleto 10cm 10cm layout 15x15cm translate 5cm -1cm gwrite -p plotter gcode/bezier.gcode`;
  // const vpype = `vpype --config configs/plotter.toml read svg/bezier.svg penwidth 0.3mm scaleto 10cm 10cm layout 15x15cm translate 5cm -1cm show`;

  // const vpype = `vpype --config configs/plotter.toml read svg/test-square.svg linemerge penwidth 0.3mm scaleto 10cm 10cm layout 22x22cm translate -- -5cm 1cm show`;
  // const vpype = `vpype --config configs/plotter.toml read svg/bezier.svg linemerge penwidth 0.3mm scaleto 14cm 14cm layout 22x22cm translate 5cm 1cm gwrite -p plotter gcode/bezier.gcode`;
  // const vpype = `vpype --config configs/plotter.toml read svg/spiral-hatched-2.svg linemerge penwidth 0.3mm scaleto 10cm 10cm layout 15x15cm translate 5cm -1cm gwrite -p plotter gcode/spiral-hatched-2.gcode`;

  // const vpype = `vpype --config configs/plotter.toml read svg/triangle-spiral-wiki.svg penwidth 0.4mm scaleto 10cm 10cm layout 22x22cm translate 5cm 1cm gwrite -p plotter gcode/triangle-spiral-wiki.gcode`;

  const vpype = `vpype --config configs/plotter.toml read svg/graancirkels-2.svg penwidth 0.4mm scaleto 10cm 10cm layout 22x22cm translate 5cm 1cm gwrite -p plotter gcode/graancirkels-2.gcode`;

  // const vpype = `vpype --config configs/plotter.toml read svg/hourglass.svg penwidth 0.4mm scaleto 10cm 10cm layout 22x22cm translate 5cm 1cm gwrite -p plotter gcode/hourglass-a5.gcode`;
  // const vpype = `vpype --config configs/plotter.toml read svg/hilbert-wiki.svg penwidth 0.4mm scaleto 10cm 10cm layout 22x22cm translate 5cm 1cm gwrite -p plotter gcode/hilbert-a5.gcode`;

  // const vpype = `vpype --config configs/plotter.toml read svg/circles-3.svg penwidth 0.4mm occult -i scaleto 10cm 10cm layout 22x22cm translate 5cm 1cm gwrite -p plotter gcode/circles-a5.gcode`;
  // const vpype = `vpype --config configs/plotter.toml read svg/squares.svg penwidth 0.3mm scaleto 10cm 10cm layout 22x22cm translate 5cm 1cm show`;

  // const vpype = `vpype --config configs/plotter.toml read svg/wiggles.svg penwidth 0.3mm scaleto 10cm 10cm layout 22x22cm translate 5cm 1cm gwrite -p plotter gcode/wiggles.gcode`;

  // const vpype = `vpype --config configs/plotter.toml read svg/myfirstdrawing.svg penwidth 0.3mm layout 15x15cm gwrite -p plotter gcode/myfirstdrawing-optimized.gcode`;

  // const vpype = `vpype --config configs/plotter.toml read svg/nono-puzzles-hatched.svg linemerge penwidth 0.1mm scaleto 10cm 10cm layout 15x15cm translate 5cm -1cm gwrite -p plotter gcode/nono-hatch-good-hopefully-2.gcode`;

  // const vpype = `vpype --config configs/plotter.toml read svg/nono-puzzles.svg pixelize --mode big layout 15x15cm show`;

  // const vpype = `vpype --config configs/plotter.toml read svg/nono-puzzles.svg layout 15x15cm translate 5cm -1cm show`;

  // const vpype = `vpype --config configs/plotter.toml read svg/hatch.svg layout 15x15cm gwrite -p plotter gcode/hatch.gcode`;
  // const vpype = `vpype --config configs/plotter.toml read svg/hatch.svg layout 15x15cm translate 5cm -1cm gwrite -p plotter gcode/hatch.gcode`;

  const stl = await Bun.spawnSync([...vpype.split(" ")]);
  console.log("success", stl.success);
}

createGCode();
