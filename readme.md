The intended flow of this application:

1. This app serves a frontend where you can browse and load art files. 
- The art files (vue or react, havent decided yet) contain JSX and D3.js to create SVG's.
- The art should work with parameters that can be edited through gui.dat. This allows you to quickly create variants.
- The frontend should have a 'plot' button, which submits the SVG to the backend
- Nice to have: the frontend contains a button to export and save as .svg
2. The backend receives this .svg and transforms it to an .stl
- Uses either a JS implementation or maybe openscad CLI.
3. The backend uses the PrusaSlicer's CLI or REST API (if it exsists) to transform the stl to gcode. Most of the settings should be hardcoded for my printer.
4. The backend uploads to gcode to octopi. It doesn't instantly print it, so the user can go to octopi to see if everything is correct.



Current status:
Since I'm a frontend dev, step 1 won't be a problem. I made a proof-of-concept for steps 2-4 and it worked really well.
The current limitation is that Prusaslicer still believes it's generating gcode for a 3d printer instead of a plotter.
This means that it won't overlap two lines, which is a funny effect but very limiting.

Next up:
- See if I can get PrusaSlicer to generate gcode for a plotter
- If not, see if I can replace Prusaslicer by inkscape + plugins through a CLI. 
