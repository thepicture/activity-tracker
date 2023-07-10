import express, { json, urlencoded } from "express";
import cors from "cors";
import configs from "./configs";

const app = express();

app.use(json({ limit: configs.development.limit.json }));
app.use(
  urlencoded({
    extended: true,
    limit: configs.development.limit.uri,
  })
);
app.use(cors());

const environment =
  process.env.NODE_ENV === "production" ? "production" : "development";

app.listen(() => console.log(`Listening on port ${configs[environment].port}`));
