import { Request, Response } from "express";
import otpService from "../services/otp-service";
import hashService from "../services/hash-service";
import userService from "../services/user-service";
import tokenService from "../services/token-service";
import UserDto from "../dto/user-dto";

class AuthController {
  public async sendOtp(req: Request, res: Response) {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Phone field is required" });
    }

    const otp = otpService.generateOtp();

    //Hash the otp
    const ttl = 1000 * 60 * 5; //OTP valid time
    const otpValidTill = Date.now() + ttl;
    const data = `${phone}.${otp}.${otpValidTill}`;
    const hash = hashService.hashOtp(data);

    //send otp
    try {
      // await otpService.sendBySms(phone, otp);
      return res.status(200).json({
        hash: `${hash}.${otpValidTill}`,
        phone,
        otp,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to generate an otp" });
    }
  }
  public async verifyOtp(req: Request, res: Response) {
    const { otp, phone, hash } = req.body;
    if (!otp || !phone || !hash) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [hashedOtp, otpValidTill] = hash.split(".");
    if (Date.now() > +otpValidTill) {
      return res.status(400).json({ message: "OTP is not valid" });
    }

    const data = `${phone}.${otp}.${otpValidTill}`;

    const isValid = otpService.verifyOtp(hashedOtp, data);

    if (!isValid) {
      return res.status(400).json({ message: "OTP is not valid" });
    }

    let user;

    try {
      user = await userService.findUser({ phone });
      if (!user) {
        await userService.createUser({ phone, activated: false });
        return;
      }
    } catch (error) {
      console.log("Error", error);
      return res.status(500).json({ message: "Error in DB" });
    }

    //TOKEN
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false,
    });

    await tokenService.storeRefreshToken(refreshToken, user._id);

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true, //ClientJS won't be able to read it, only server will be able to read it
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true, //ClientJS won't be able to read it, only server will be able to read it
    });

    const userDto = new UserDto(user);

    res.json({ user: userDto, auth: true });
  }
}

export default new AuthController();
