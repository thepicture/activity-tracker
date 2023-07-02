import { getTemplates } from "controllers";
import { Application } from "express";

const initializeControllers = (app: Application) => {
  app.use("/templates", getTemplates);
};

export { initializeControllers };
