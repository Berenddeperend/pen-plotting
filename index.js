const fileName = Bun.argv[2];

// const mySvg = Bun.file("./myfirstdrawing.svg");
// const content = await mySvg.text();

console.log(Bun.argv);

const svgToStl = `/Applications/OpenSCAD.app/Contents/MacOS/OpenSCAD -D svgFile=${fileName}.svg -o ${fileName}.stl svg-to-stl.scad`;

/*
  Scale to fit is in mms, 220 being ender 3 bed size.
 */
const stlToGcode = `/Applications/PrusaSlicer.app/Contents/MacOS/PrusaSlicer --export-gcode --scale-to-fit 140,140,1 ${fileName}.stl --load prusa-config.ini`;

const stl = await Bun.spawnSync([...svgToStl.split(" ")]);
console.log("stl success: ", stl.success);

const gcode = await Bun.spawnSync([...stlToGcode.split(" ")], {
  stdout: "inherit",
});
console.log("gcode success: ", gcode.success);
