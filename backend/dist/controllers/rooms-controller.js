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
const room_dto_1 = __importDefault(require("../dto/room-dto"));
const room_service_1 = __importDefault(require("../services/room-service"));
class RoomsController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { topic, roomType } = req.body;
            if (!topic || !roomType) {
                res.status(400).json({ message: "All fields are required" });
            }
            const room = yield room_service_1.default.create({
                topic,
                roomType,
                ownerId: req.user._id,
            });
            return res.json(new room_dto_1.default(room));
        });
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = yield room_service_1.default.getAllRooms(["open"]);
            const allRooms = rooms.map((room) => new room_dto_1.default(room));
            return res.json(allRooms);
        });
    }
}
exports.default = new RoomsController();
//# sourceMappingURL=rooms-controller.js.map