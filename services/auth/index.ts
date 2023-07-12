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

app.use('/', (_, response) => {
  return response.end('pong');
});

const environment =
  process.env.NODE_ENV === "production" ? "production" : "development";

const PORT = configs[environment].port;

app.listen(PORT, () => console.log(`Listening on port ${configs[environment].port}`));
