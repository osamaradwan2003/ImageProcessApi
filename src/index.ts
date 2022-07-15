import express from "express";
import route from "./routes";
const app = express();

app.use(route);

const port = 80;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
