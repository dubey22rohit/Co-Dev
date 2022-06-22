"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    phone: { type: String, required: true },
    activated: { type: Boolean },
    username: { type: String, required: false },
    avatar: {
        type: String,
        required: false,
        get: (avatar) => {
            if (avatar) {
                return `${process.env.BASE_URL}${avatar}`;
            }
            return avatar;
        },
    },
}, {
    timestamps: true,
    toJSON: { getters: true },
});
exports.default = mongoose_1.default.model("User", UserSchema, "users");
//# sourceMappingURL=User.js.map