import { Router } from "express";
import { constants } from "node:http2";
import { trySignIn } from "../service";

const router = Router();

router.post("/", ({ body: { phone, password } }, response) => {
  try {
    response.status(constants.HTTP_STATUS_OK).json(trySignIn(phone, password));
  } catch (_) {
    return response.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
      code: constants.HTTP_STATUS_UNAUTHORIZED,
      errors: ["incorrect phone or password"],
    });
  }
});

export { router };
