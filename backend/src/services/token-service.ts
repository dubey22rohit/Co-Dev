import jwt from "jsonwebtoken";
import Refresh from "../models/Refresh";

class TokenService {
  public generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1y",
      }
    );

    return { accessToken, refreshToken };
  }
  public async storeRefreshToken(token, userId) {
    try {
      await Refresh.create({
        token,
        userId,
      });
    } catch (error) {
      console.log("Error", error);
    }
  }

  public verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
  }
}

export default new TokenService();
