import React, { useState } from "react";
import Email from "./Email/Email.component";
import Phone from "./Phone/Phone.component";
import styles from "./StepPhoneEmail.module.css";

type stepOptions = {
  [key: string]: any;
};

const PhoneEmailMap: stepOptions = {
  phone: Phone,
  email: Email,
};

const StepPhoneEmail = ({ onNext }: any) => {
  const [credType, setCredType] = useState("phone");

  const Component = PhoneEmailMap[credType];

  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.buttonWrapper}>
            <button
              className={`${styles.tabButton} ${
                credType === "phone" ? styles.active : ""
              }`}
              onClick={() => setCredType("phone")}
            >
              <img src="/images/phone-white.png" alt="phone" />
            </button>
            <button
              className={`${styles.tabButton} ${
                credType === "email" ? styles.active : ""
              }`}
              onClick={() => setCredType("email")}
            >
              <img src="/images/mail-white.png" alt="mail" />
            </button>
          </div>
          <Component onNext={onNext} />
        </div>
      </div>
    </>
  );
};

export default StepPhoneEmail;
