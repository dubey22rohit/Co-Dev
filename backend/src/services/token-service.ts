import jwt from "jsonwebtoken";
import Refresh from "../models/Refresh";

class TokenService {
  public generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: "1y",
    });

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

  public verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
  }

  public async findRefreshToken(userId, refreshToken) {
    return await Refresh.findOne({ _id: userId, token: refreshToken });
  }

  public async updateRefreshToken(userId, refreshToken) {
    return await Refresh.updateOne({ userId: userId }, { token: refreshToken });
  }
}

export default new TokenService();
