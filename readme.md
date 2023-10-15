The intended flow of this application:

1. There is a frontend where you can browse and load art files. The list is provided thru an endpoint by the backend that scans a folder for files. 
- The art files (vue or react, havent decided yet) contain JSX and D3.js to create SVG's.
- The art should work with parameters that can be edited through gui.dat. This allows you to quickly create variants.
- The frontend should have a 'plot' button, which submits the SVG to the backend
  - The backend transforms the svg to gcode and opens a new page with the gcodeviewer

- Nice to have: the frontend contains a button to export and save as .svg
2. The backend receives this .svg and transforms it to an .stl
- Uses either a JS implementation or maybe openscad CLI.
3. The backend uses the PrusaSlicer's CLI or REST API (if it exsists) to transform the stl to gcode. Most of the settings should be hardcoded for my printer.
4. The backend uploads to gcode to octopi. It doesn't instantly print it, so the user can go to octopi to see if everything is correct.


Random thoughts: can't I use octopi as gcode viewer? Na, that means uploading the gcode, which is a hassle. Keep the gcode on my laptop.




I think I want some file-based routing system. One vue file is one drawing. 
Maybe the backend scans the dir with the files, creates list and exposes it through an endpoint.
The router should be dynamic and match based on file name. So `localhost:3000/flower` should load `flower.vue`.
Or maybe that's overkill. At least I want to be able to load a file by name. So the router should be dynamic.


Current status:
Since I'm a frontend dev, step 1 won't be a problem. I made a proof-of-concept for steps 2-4 and it worked really well.
The current limitation is that Prusaslicer still believes it's generating gcode for a 3d printer instead of a plotter.
This means that it won't overlap two lines, which is a funny effect but very limiting.

Next up:
- build a frontend with a gcodeviewer as prusaslicer can only render its own output.
- 

https://ncviewer.com/ als gcodeviewer, maar ook een lokale variant zoeken. Misschien eentje in node?
