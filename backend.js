import express from "express";
import fs from "fs";
import cors from "cors";

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
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/print", (req, res) => {
  res.send(req.body.svg);
});

app.get("/files", (req, res) => {
  res.send(drawingFiles);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
