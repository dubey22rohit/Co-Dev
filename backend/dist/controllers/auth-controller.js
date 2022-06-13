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
const otp_service_1 = __importDefault(require("../services/otp-service"));
const hash_service_1 = __importDefault(require("../services/hash-service"));
const user_service_1 = __importDefault(require("../services/user-service"));
const token_service_1 = __importDefault(require("../services/token-service"));
const user_dto_1 = __importDefault(require("../dto/user-dto"));
class AuthController {
    sendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phone } = req.body;
            if (!phone) {
                return res.status(400).json({ message: "Phone field is required" });
            }
            const otp = otp_service_1.default.generateOtp();
            //Hash the otp
            const ttl = 1000 * 60 * 5; //OTP valid time
            const otpValidTill = Date.now() + ttl;
            const data = `${phone}.${otp}.${otpValidTill}`;
            const hash = hash_service_1.default.hashOtp(data);
            //send otp
            try {
                // await otpService.sendBySms(phone, otp);
                return res.status(200).json({
                    hash: `${hash}.${otpValidTill}`,
                    phone,
                    otp,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Failed to generate an otp" });
            }
        });
    }
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { otp, phone, hash } = req.body;
            if (!otp || !phone || !hash) {
                return res.status(400).json({ message: "All fields are required" });
            }
            const [hashedOtp, otpValidTill] = hash.split(".");
            if (Date.now() > +otpValidTill) {
                return res.status(400).json({ message: "OTP is not valid" });
            }
            const data = `${phone}.${otp}.${otpValidTill}`;
            const isValid = otp_service_1.default.verifyOtp(hashedOtp, data);
            if (!isValid) {
                return res.status(400).json({ message: "OTP is not valid" });
            }
            let user;
            try {
                user = yield user_service_1.default.findUser({ phone });
                if (!user) {
                    yield user_service_1.default.createUser({ phone, activated: false });
                    return;
                }
            }
            catch (error) {
                console.log("Error", error);
                return res.status(500).json({ message: "Error in DB" });
            }
            //TOKEN
            const { accessToken, refreshToken } = token_service_1.default.generateTokens({
                _id: user._id,
                activated: false,
            });
            yield token_service_1.default.storeRefreshToken(refreshToken, user._id);
            res.cookie("refreshToken", refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true, //ClientJS won't be able to read it, only server will be able to read it
            });
            res.cookie("accessToken", accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true, //ClientJS won't be able to read it, only server will be able to read it
            });
            const userDto = new user_dto_1.default(user);
            res.json({ user: userDto, auth: true });
        });
    }
    refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken: cookieRefreshToken } = req.cookies;
            let userData;
            try {
                userData = token_service_1.default.verifyRefreshToken(cookieRefreshToken);
            }
            catch (error) {
                return res.status(401).json({ message: "Invalid token" });
            }
            try {
                const token = yield token_service_1.default.findRefreshToken(userData._id, cookieRefreshToken);
                if (!token) {
                    return res.status(401).json({ message: "Invalid token" });
                }
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "Server error : findRefreshToken failed" });
            }
            //Check if user valid
            const user = yield user_service_1.default.findUser({ _id: userData._id });
            if (!user) {
                return res.status(404).json({ message: "User not found!" });
            }
            const { accessToken, refreshToken } = token_service_1.default.generateTokens({
                _id: userData._id,
            });
            try {
                yield token_service_1.default.updateRefreshToken(user._id, refreshToken);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "Server error : updateRefreshToken failed" });
            }
            res.cookie("refreshToken", refreshToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true, //ClientJS won't be able to read it, only server will be able to read it
            });
            res.cookie("accessToken", accessToken, {
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true, //ClientJS won't be able to read it, only server will be able to read it
            });
            const userDto = new user_dto_1.default(user);
            res.json({ user: userDto, auth: true });
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth-controller.js.map