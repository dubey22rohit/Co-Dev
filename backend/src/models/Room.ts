import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
    topic: { type: String, required: true },
    roomType: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    speakers: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Room", RoomSchema, "rooms");
