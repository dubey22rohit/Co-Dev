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

const Auth = () => {
  const [step, setStep] = useState(0);

  const onNext = () => {
    setStep(step + 1);
  };

  const Step = steps[step];

  return <Step onNext={onNext} />;
};

export default Auth;
