import React, { useState } from "react";
import StepAvatar from "../Steps/StepAvatar/StepAvatar.component";
import StepName from "../Steps/StepName/StepName.component";
import StepOtp from "../Steps/StepOtp/StepOtp.component";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail.component";
import StepUsername from "../Steps/StepUsername/StepUsername.component";
import styles from "./Register.module.css";

type stepOptions = {
  [key: number]: any;
};

const steps: stepOptions = {
  0: StepPhoneEmail,
  1: StepOtp,
  2: StepName,
  3: StepAvatar,
  4: StepUsername,
};

const Register = () => {
  const [step, setStep] = useState(0);

  const handleClick = () => {
    setStep(step + 1);
  };

  const Step = steps[step];

  return (
    <div>
      <Step onClick={handleClick} />
    </div>
  );
};

export default Register;
