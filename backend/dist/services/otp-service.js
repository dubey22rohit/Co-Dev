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
const crypto_1 = __importDefault(require("crypto"));
const twilio_1 = __importDefault(require("twilio"));
const hash_service_1 = __importDefault(require("./hash-service"));
const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const smsPhoneNumber = process.env.SMS_FROM_NUMBER;
const twilioInit = (0, twilio_1.default)(smsSid, smsAuthToken, {
    lazyLoading: true,
});
class OtpService {
    generateOtp() {
        const otp = crypto_1.default.randomInt(100000, 999999);
        return otp;
    }
    sendBySms(phone, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield twilioInit.messages.create({
                to: phone,
                from: smsPhoneNumber,
                body: `Your Co-Dev otp is ${otp}`,
            });
        });
    }
    verifyOtp(hashedOtp, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let computedHash = hash_service_1.default.hashOtp(data);
            return computedHash === hashedOtp;
        });
    }
}
exports.default = new OtpService();
//# sourceMappingURL=otp-service.js.map