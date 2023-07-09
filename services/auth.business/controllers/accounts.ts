import { Request, Response } from "express";

export default (request: Request, response: Response) => {
  return response.end();
};
