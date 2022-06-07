import React, { useState } from "react";
import StepOtp from "../Steps/StepOtp/StepOtp.component";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail.component";

type stepOptions = {
  [key: number]: any;
};

const steps: stepOptions = {
  0: StepPhoneEmail,
  1: StepOtp,
};

const Login = () => {
  const [step, setStep] = useState(0);

  const handleClick = () => {
    setStep(step + 1);
  };

  const Step = steps[step];

  return <Step onClick={handleClick} />;
};

export default Login;
