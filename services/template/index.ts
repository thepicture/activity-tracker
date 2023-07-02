import express, { Application } from "express";
import cors from "cors";
import { initializeControllers } from "utils";

module.exports = async (app: Application) => {
  app.use(express.json({ limit: "8mb" }));
  app.use(
    express.urlencoded({
      extended: true,
      limit: "1mb",
    })
  );
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  initializeControllers(app);
};
