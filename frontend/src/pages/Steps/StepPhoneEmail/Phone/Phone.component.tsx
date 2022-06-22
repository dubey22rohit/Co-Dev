import React, { useState } from "react";
import Button from "../../../../components/shared/Button/Button.component";
import Card from "../../../../components/shared/Card/Card.component";
import TextInput from "../../../../components/shared/TextInput/TextInput.component";
import { sendOtp } from "../../../../http";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";
import styles from "../StepPhoneEmail.module.css";
const Phone = ({ onNext }: any) => {
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState("");

  const submit = async () => {
    if (!phoneNumber) {
      return;
    }
    const { data } = await sendOtp({ phone: phoneNumber });
    console.log(data);
    dispatch(setOtp({ phone: data.phone, hash: data.hash }));
    onNext();
  };

  return (
    <Card title="Enter your phone" icon="phone.png">
      <TextInput value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <div>
        <div className={styles.buttonWrapper}>
          <Button text="Next" onClick={submit} />
        </div>
        <p className={styles.bottomPara}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore deleniti vitae laboriosam
          alias reprehenderit?
        </p>
      </div>
    </Card>
  );
};

export default Phone;
