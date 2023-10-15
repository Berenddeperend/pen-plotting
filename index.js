const fileName = Bun.argv[2]; //without extension.

// const mySvg = Bun.file("./myfirstdrawing.svg");
// const content = await mySvg.text();

const { pathname } = new URL(`./svg/${fileName}.svg`, import.meta.url);

console.log(pathname);

async function createGCode() {
  const svgToStl = `/Applications/OpenSCAD.app/Contents/MacOS/OpenSCAD -D svgFilePath="${pathname}" --debug all -o stl/${fileName}.stl configs/svg-to-stl.scad`;

  /*
    Scale to fit is in mms, 220 being ender 3 bed size.
   */
  const stlToGcode = `/Applications/PrusaSlicer.app/Contents/MacOS/PrusaSlicer --export-gcode --scale-to-fit 120,120,1 stl/${fileName}.stl --load ./configs/prusa-config.ini --output gcode/${fileName}.gcode`;

  const stl = await Bun.spawnSync([...svgToStl.split(" ")]);
  console.log("stl success: ", stl.success);

  const gcode = await Bun.spawnSync([...stlToGcode.split(" ")], {
    stdout: "inherit",
  });
  console.log("gcode success: ", gcode.success);
}

createGCode();
