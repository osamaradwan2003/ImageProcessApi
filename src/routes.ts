import express from "express";
import { promises as fs } from "fs";
const path = require("path");
const Jimp = require("jimp");
const route = express.Router();

route.get("/api/images", async (req, res) => {
  const filename: string = req.query.filename as string;
  const w: string = req.query.width as string;
  const h: string = req.query.height as string;
  Resize(filename, w, h)
    .then((data) => {
      res.status(200).type("image/png").send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

async function Resize(filename: string, width: string, height: string) {
  const filePath = path.join(__dirname, "../", "/images", filename + ".jpg");
  console.log(filePath);
  let buffer;
  try {
    buffer = await fs.readFile(filePath);
  } catch (err) {
    throw "File not found";
  }
  const image = await Jimp.read(buffer);
  if (width !== "0" && height !== "0") {
    image.resize(parseInt(width), parseInt(height));
  } else {
    throw "Width and height must be greater than 0";
  }
  return image.getBufferAsync(Jimp.MIME_PNG);
}

export default route;
