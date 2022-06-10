"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class HashService {
    hashOtp(data) {
        return crypto_1.default
            .createHmac("sha256", process.env.HASH_SECRET)
            .update(data)
            .digest("hex");
    }
}
exports.default = new HashService();
//# sourceMappingURL=hash-service.js.map