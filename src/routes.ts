import express from "express";
import { promises as fs } from "fs";
const path = require("path");
const sharp = require("sharp");
const route = express.Router();

route.get("/api/images", async (req, res) => {
  const filename: string = req.query.filename as string;
  const w: string = req.query.width as string;
  const h: string = req.query.height as string;
  Resize(filename, w, h)
    .then(async (data) => {
      await fs.access(path.join(__dirname, "../", "thumb")).catch(() => {
        fs.mkdir(path.join(__dirname, "../", "thumb"));
      });
      fs.writeFile(
        path.join(__dirname, "../", "thumb", filename + w + "x" + h + ".jpg"),
        data
      );
      return res.status(200).type("image/jpeg").send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).type("html").send(err);
    });
});

async function Resize(
  filename: string,
  width: string,
  height: string
): Promise<Buffer> {
  const fullPath = path.join(__dirname, "../", "images", filename + ".jpg");
  return await sharp(fullPath)
    .resize({
      width: parseInt(width),
      height: parseInt(height),
    })
    .jpeg()
    .toBuffer();
}
export default route;
