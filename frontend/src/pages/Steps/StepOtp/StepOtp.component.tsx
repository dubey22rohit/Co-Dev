import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/shared/Button/Button.component";
import Card from "../../../components/shared/Card/Card.component";
import TextInput from "../../../components/shared/TextInput/TextInput.component";
import { verifyOtp } from "../../../http";
import { setAuth } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import styles from "./StepOtp.module.css";

const StepOtp = ({ onNext }: any) => {
  const { phone, hash } = useSelector((state: any) => state.auth.otp);
  const dispatch = useDispatch();

  const [otp, setOtp] = useState("");
  const otpSubmitHandler = async () => {
    if (!otp || !phone || !hash) {
      return;
    }
    try {
      const { data } = await verifyOtp({ otp, phone, hash });
      console.log(data);
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.cardWrapper}>
      <Card title="Enter the code we just texted you" icon="lock-emoji.png">
        <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
        <div className={styles.actionButtonWrap}>
          <Button onClick={otpSubmitHandler} text="Next" />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you're agreeing to our Terms of Service and Privacy Policy.
          Thanks!
        </p>
      </Card>
    </div>
  );
};

export default StepOtp;
