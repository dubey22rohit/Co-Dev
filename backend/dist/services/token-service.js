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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Refresh_1 = __importDefault(require("../models/Refresh"));
class TokenService {
    generateTokens(payload) {
        const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
            expiresIn: "1h",
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
            expiresIn: "1y",
        });
        return { accessToken, refreshToken };
    }
    storeRefreshToken(token, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Refresh_1.default.create({
                    token,
                    userId,
                });
            }
            catch (error) {
                console.log("Error", error);
            }
        });
    }
    verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    }
}
exports.default = new TokenService();
//# sourceMappingURL=token-service.js.map