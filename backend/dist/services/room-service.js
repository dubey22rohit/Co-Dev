"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Room_1 = __importDefault(require("../models/Room"));
class RoomService {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { topic, roomType, ownerId } = payload;
            try {
                const room = yield Room_1.default.create({ topic, roomType, ownerId, speakers: [ownerId] });
                return room;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getAllRooms(types) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield Room_1.default.find({ roomType: { $in: types } })
                    .populate("speakers")
                    .populate("ownerId")
                    .exec();
                return rooms;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getRoom(roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const room = yield Room_1.default.findOne({ _id: roomId });
                return room;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = new RoomService();
//# sourceMappingURL=room-service.js.map