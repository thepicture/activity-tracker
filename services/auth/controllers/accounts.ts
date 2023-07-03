import { Request, Response } from "express";
import { createAccount } from "service";

export default (request: Request, response: Response) => {
  const { login, password } = request.body;

  return createAccount(login, password);
};
