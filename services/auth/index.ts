import cors from "cors";
import express, { json, urlencoded } from "express";
import * as OpenApiValidator from "express-openapi-validator";
import configs from "./configs";
import { authRouter } from "./controllers";

const app = express();

app.use(json({ limit: configs.development.limit.json }));
app.use(
  urlencoded({
    extended: true,
    limit: configs.development.limit.uri,
  })
);

app.use(cors());

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./spec/root.yaml",
    validateResponses: true,
  })
);

app.use("/auth", authRouter);

const environment =
  process.env.NODE_ENV === "production" ? "production" : "development";

const PORT = configs[environment].port;

app.listen(PORT, () =>
  console.log(`Listening on port ${configs[environment].port}`)
);
