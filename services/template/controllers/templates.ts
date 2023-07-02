import { Request, Response } from "express";
import { constants } from "http2";

const getTemplates = (_request: Request, response: Response) => {
  return response.sendStatus(constants.HTTP_STATUS_OK);
};

export { getTemplates };
