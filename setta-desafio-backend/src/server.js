import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("ok");
});

app.listen(PORT, () =>
  console.log(`Server running in http://localhost:${PORT}}`)
);
