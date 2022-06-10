import { Request, Response } from "express";
import Jimp from "jimp";
import path from "path";
import UserDto from "../dto/user-dto";
import { IGetUserAuthInfoRequest } from "../middlewares/auth-middleware";
import userService from "../services/user-service";

class ActivateController {
  public async activate(req: IGetUserAuthInfoRequest, res: Response) {
    const { username, avatar } = req.body;

    if (!username || !avatar) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const buffer = Buffer.from(
      avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

    try {
      const jimResp = await Jimp.read(buffer);
      jimResp
        .resize(150, Jimp.AUTO)
        .write(path.resolve(__dirname, `../storage/${imagePath}`));
    } catch (err) {
      res.status(500).json({ message: "Could not process the image" });
      return;
    }

    const userId = req.user._id;

    try {
      const user = await userService.findUser({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      user.activated = true;
      user.username = username;
      user.avatar = `/storage/${imagePath}`;
      user.save();
      res.json({ user: new UserDto(user), auth: true });
    } catch (error) {
      return res.status(500).json({ message: "Some error occured" });
    }
  }
}

export default new ActivateController();
