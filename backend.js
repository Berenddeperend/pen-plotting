import express from "express";
import fs from "fs";
import cors from "cors";
import { $ } from "bun";

const octoPiSettings = {
  headers: {
    "X-Api-Key": process.env.OCTOPI_KEY,
  },
};

const app = express()
  .use(cors())
  .use(express.json({ limit: "100mb" }));
const port = 8080;

const drawingFiles = fs
  .readdirSync(import.meta.dir + "/frontend/src/drawings")
  .sort((a, b) => {
    return (
      fs
        .statSync(import.meta.dir + "/frontend/src/drawings/" + b)
        .mtime.getTime() -
      fs
        .statSync(import.meta.dir + "/frontend/src/drawings/" + a)
        .mtime.getTime()
    );
  });

const saveSvgLocally = async (
  file,
  fileName = Math.random().toString(36).substring(7),
) => {
  await Bun.write(`./svg/generated/${fileName}.svg`, file);
};

const getFilesFromPrinter = async () => {
  const response = await fetch(
    "http://octopi.local/api/files/local",
    octoPiSettings,
  ).catch((err) => {
    throw new Error(err);
  });

  const files = await response.json();

  return files.files.map((file) => file.name);
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/status", (req, res, next) => {
  fetch("http://octopi.local/api/printer", octoPiSettings)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });

  // try {
  //   const response = await fetch(
  //     "http://octopi.local/api/printer",
  //     octoPiSettings,
  //   );
  //
  //   res.send(await response.json());
  // } catch (err) {
  //   res.status(500).send(err);
  // }
});

const getRandomString = () => Math.random().toString(36).substring(7);

const getVpypeBaseOptions = (req, fileName) => {
  return [
    "vpype",
    "--config",
    "configs/plotter.toml", //vpype-gcode config
    "read",
    `svg/generated/${fileName}.svg`,
    "penwidth",
    `${req.body.penWidthInMM}mm`,
    "pagesize",
    `${req.body.orientation === "landscape" ? "--landscape" : ""}`,
    req.body.size,

    "layout",

    // "--fit-to-margins",
    // `${Math.max(req.body.paddingXInMM, req.body.paddingYInMM)}mm`,

    "-h",
    "center",
    "-v",
    "bottom",
    "-b",
    "22x22cm",

    // "14.85x21cm",

    // "translate",
    // "5cm",
    // "1cm",
  ].filter((d) => !!d);
};

app.get("/hello-world", (req, res) => {
  res.send("Hello World");
});

app.post("/preview", async (req, res) => {
  const fileName = getRandomString();
  const vpypeOptions = [...getVpypeBaseOptions(req, fileName), "show"];

  await saveSvgLocally(req.body.svg, fileName);

  try {
    // await Bun.spawnSync(vpypeOptions);
    await $`${vpypeOptions}`;

    res.send("ok");
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/print", async (req, res) => {
  /*
   * 0. save svg to file
   * 1. upload file to octoprint
   * 2. select file
   * 3. print
   * */

  try {
    const randomstring = getRandomString();

    await saveSvgLocally(req.body.svg, randomstring);

    const vpypeOptions = [
      ...getVpypeBaseOptions(req, randomstring),
      // "linemerge",

      "gwrite",
      "-p",
      "plotter",
      `gcode/generated/${randomstring}.gcode`,
    ];

    await Bun.spawnSync(vpypeOptions);

    const file = Bun.file(`./gcode/generated/${randomstring}.gcode`);
    // const file = Bun.file(`./gcode/generated/bg29uj.gcode`);

    const arrbuf = await file.arrayBuffer();
    const buffer = Buffer.from(arrbuf);
    const blob = new Blob([buffer]);

    const uploadFormData = new FormData();
    uploadFormData.append("file", blob, `${randomstring}.gcode`);

    await fetch(`http://octopi.local/api/files/local`, {
      method: "POST",
      body: uploadFormData,
      headers: {
        "X-Api-Key": process.env.OCTOPI_KEY,
      },
    });

    await fetch(`http://octopi.local/api/files/local/${randomstring}.gcode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.OCTOPI_KEY,
      },
      body: JSON.stringify({
        command: "select",
        print: true,
      }),
    });

    res.send(`${randomstring}.gcode`);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/files", (req, res) => {
  res.send(drawingFiles);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
