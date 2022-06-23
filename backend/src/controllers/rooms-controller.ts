import { Request, Response } from "express";
import RoomDto from "../dto/room-dto";
import { IGetUserAuthInfoRequest } from "../middlewares/auth-middleware";
import roomService from "../services/room-service";

class RoomsController {
  public async create(req: IGetUserAuthInfoRequest, res: Response) {
    const { topic, roomType } = req.body;
    if (!topic || !roomType) {
      res.status(400).json({ message: "All fields are required" });
    }

    const room = await roomService.create({
      topic,
      roomType,
      ownerId: req.user._id,
    });
    return res.json(new RoomDto(room));
  }

  public async index(req: Request, res: Response) {
    const rooms = await roomService.getAllRooms(["open"]);
    const allRooms = rooms.map((room) => new RoomDto(room));
    return res.json(allRooms);
  }

  public async show(req: Request, res: Response) {
    const room = await roomService.getRoom(req.params.roomId);
    return res.status(200).json(room);
  }
}

export default new RoomsController();
