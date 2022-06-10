import crypto from "crypto";
import twilio from "twilio";
import hashService from "./hash-service";

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const smsPhoneNumber = process.env.SMS_FROM_NUMBER;

const twilioInit = twilio(smsSid, smsAuthToken, {
  lazyLoading: true,
});

class OtpService {
  public generateOtp() {
    const otp = crypto.randomInt(100000, 999999);
    return otp;
  }
  public async sendBySms(phone, otp) {
    return await twilioInit.messages.create({
      to: phone,
      from: smsPhoneNumber,
      body: `Your Co-Dev otp is ${otp}`,
    });
  }
  public async verifyOtp(hashedOtp, data) {
    let computedHash = hashService.hashOtp(data);
    return computedHash === hashedOtp;
  }
}

export default new OtpService();
