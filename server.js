const dotenv = require("dotenv");

dotenv.config();

const expresss = require("express");
const app = expresss();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fs = require("fs");

var cors = require("cors");

app.use(cors());

app.use(expresss.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/models", async (req, res, next) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) next();
    const models = JSON.parse(data).models;
    res.status(200).send(models);
  });
});

app.post("/models/create", async (req, res, next) => {
  const data = fs.readFileSync("./db.json", "utf-8");
  const models = JSON.parse(data).models;
  const model = req.body;
  model["id"] = new Date();
  models.push(model);
  fs.writeFileSync("./db.json", JSON.stringify({ models: models }), "utf-8");
  res.status(200).send("Model Inserted");
});

app.use((req, res, next) => {
  console.log("error occured");
});

const port = process.env.PORT || 4000;

console.log({ port });
app.listen(port, () => {
  console.log(`Server is working on http://localhost:${port}`);
});
