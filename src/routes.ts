import express from "express";
import { promises as fs } from "fs";
import Resize from "./utilities/reizeImage";

const path = require("path");
const route = express.Router();

route.get("/api/images", (req: any, res: any): void => {
  const filename: string = req.query.filename as string;
  const w: string = req.query.width as string;
  const h: string = req.query.height as string;
  fs.access(path.join(__dirname, "../", "thumb")).catch(() => {
    fs.mkdir(path.join(__dirname, "../", "thumb"));
  });
  fs.access(
    path.join(__dirname, "../", "thumb", filename + w + "x" + h + ".jpg")
  )
    .then(() => {
      res
        .type("image/png")
        .status(200)
        .sendFile(
          path.join(__dirname, "../", "thumb", filename + w + "x" + h + ".jpg")
        );
    })
    .catch(() => {
      Resize(filename, w, h)
        .then(async (data) => {
          res.status(200).type("image/jpeg").send(data);
          fs.writeFile(
            path.join(
              __dirname,
              "../",
              "thumb",
              filename + w + "x" + h + ".jpg"
            ),
            data
          );
        })
        .catch((err) => {
          console.log(err);
          res.status(500).type("html").send(err.message);
        });
    });
});

export default route;
