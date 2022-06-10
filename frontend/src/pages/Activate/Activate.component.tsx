import React, { useState } from "react";
import StepAvatar from "../Steps/StepAvatar/StepAvatar.component";
import StepName from "../Steps/StepName/StepName.component";
import styles from "./Activate.module.css";
type stepOptions = {
  [key: number]: any;
};

const activateSteps: stepOptions = {
  0: StepName,
  1: StepAvatar,
};

const Activate = () => {
  const [step, setStep] = useState(0);
  const Step = activateSteps[step];

  function onNext() {
    setStep(step + 1);
  }

  return (
    <div className={styles.cardWrapper}>
      <Step onNext={onNext} />
    </div>
  );
};

export default Activate;
