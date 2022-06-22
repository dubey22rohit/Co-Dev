import Room from "../models/Room";

class RoomService {
  public async create(payload) {
    const { topic, roomType, ownerId } = payload;
    try {
      const room = await Room.create({ topic, roomType, ownerId, speakers: [ownerId] });
      return room;
    } catch (error) {
      console.log(error);
    }
  }
  public async getAllRooms(types: Array<string>): Promise<Array<any>> {
    try {
      const rooms = await Room.find({ roomType: { $in: types } })
        .populate("speakers")
        .populate("ownerId")
        .exec();
      return rooms;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new RoomService();
