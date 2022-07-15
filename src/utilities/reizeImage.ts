const sharp = require("sharp");
const path = require("path");

async function Resize(
  filename: string,
  width: string,
  height: string
): Promise<Buffer> {
  if (filename == undefined || filename == "") {
    throw new Error("File name is required");
  }
  if (
    width === undefined ||
    width == "" ||
    isNaN(Number(width)) ||
    width == "0"
  ) {
    throw new Error("Width is undefined or not a number");
  }
  if (
    height === undefined ||
    height == "" ||
    isNaN(Number(height)) ||
    height == "0"
  ) {
    throw new Error("height is undefined or not a number");
  }
  const fullPath = path.join(__dirname, "../../", "images", filename + ".jpg");

  return await sharp(fullPath)
    .resize({
      width: parseInt(width),
      height: parseInt(height),
    })
    .jpeg()
    .toBuffer();
}

export default Resize;
