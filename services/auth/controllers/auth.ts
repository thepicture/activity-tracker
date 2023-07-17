import { Router } from "express";
import { constants } from "node:http2";
import { trySignIn } from "../service";

const router = Router();

router.post("/", async ({ body: { phone, password } }, response) => {
  try {
    const accessRefreshTokenPair = await trySignIn(phone, password);

    response.status(constants.HTTP_STATUS_OK).json(accessRefreshTokenPair);
  } catch (_) {
    return response.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
      code: constants.HTTP_STATUS_UNAUTHORIZED,
      errors: ["incorrect phone or password"],
    });
  }
});

export { router };
