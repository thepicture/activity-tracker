import { getGeneratedAccessRefreshTokenPair } from "@utils";

describe("auth", () => {
  it("should generate refresh-access token pair", () => {
    const expected = 2;

    const actual = Object.keys(getGeneratedAccessRefreshTokenPair()).length;

    expect(actual).toBe(expected);
  });
});
