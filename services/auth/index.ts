import express, { json, urlencoded } from "express";
import cors from "cors";
import configs from "./configs";

const app = express();

app.use(json({ limit: "8mb" }));
app.use(
  urlencoded({
    extended: true,
    limit: "1mb",
  })
);
app.use(cors());

const environment =
  process.env.NODE_ENV === "production" ? "production" : "development";

app.listen(() => console.log(`Listening on port ${configs[environment].port}`));
