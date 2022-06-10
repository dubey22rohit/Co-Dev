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
const jimp_1 = __importDefault(require("jimp"));
const path_1 = __importDefault(require("path"));
const user_dto_1 = __importDefault(require("../dto/user-dto"));
const user_service_1 = __importDefault(require("../services/user-service"));
class ActivateController {
    activate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, avatar } = req.body;
            if (!username || !avatar) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const buffer = Buffer.from(avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), "base64");
            const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
            try {
                const jimResp = yield jimp_1.default.read(buffer);
                jimResp
                    .resize(150, jimp_1.default.AUTO)
                    .write(path_1.default.resolve(__dirname, `../storage/${imagePath}`));
            }
            catch (err) {
                res.status(500).json({ message: "Could not process the image" });
                return;
            }
            const userId = req.user._id;
            try {
                const user = yield user_service_1.default.findUser({ _id: userId });
                if (!user) {
                    return res.status(404).json({ message: "User not found!" });
                }
                user.activated = true;
                user.username = username;
                user.avatar = `/storage/${imagePath}`;
                user.save();
                res.json({ user: new user_dto_1.default(user), auth: true });
            }
            catch (error) {
                return res.status(500).json({ message: "Some error occured" });
            }
        });
    }
}
exports.default = new ActivateController();
//# sourceMappingURL=activate-controller.js.map