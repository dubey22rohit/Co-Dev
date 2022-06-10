import React, { useState } from "react";
import Button from "../../../../components/shared/Button/Button.component";
import Card from "../../../../components/shared/Card/Card.component";
import TextInput from "../../../../components/shared/TextInput/TextInput.component";
import styles from "../StepPhoneEmail.module.css";
const Email = ({ onNext }: any) => {
  const [email, setEmail] = useState("");

  return (
    <Card title="Enter your email" icon="email-emoji.png">
      <TextInput value={email} onChange={(e) => setEmail(e.target.value)} />
      <div>
        <div className={styles.buttonWrapper}>
          <Button text="Next" onClick={onNext} />
        </div>
        <p className={styles.bottomPara}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
          deleniti vitae laboriosam alias reprehenderit?
        </p>
      </div>
    </Card>
  );
};

export default Email;
