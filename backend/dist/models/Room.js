"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const RoomSchema = new Schema({
    topic: { type: String, required: true },
    roomType: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User" },
    speakers: {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }],
        required: false,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Room", RoomSchema, "rooms");
//# sourceMappingURL=Room.js.map