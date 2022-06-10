import React, { useState } from "react";
import Button from "../../../components/shared/Button/Button.component";
import Card from "../../../components/shared/Card/Card.component";
import TextInput from "../../../components/shared/TextInput/TextInput.component";
import { useDispatch, useSelector } from "react-redux";
import styles from "./StepName.module.css";
import { setUsername } from "../../../store/activateSlice";

const StepName = ({ onNext }: any) => {
  const dispatch = useDispatch();

  const { username } = useSelector((state: any) => state.activate);

  const [stateUserName, setStateUserName] = useState(username);

  const nextStep = () => {
    if (!stateUserName) {
      return;
    }
    dispatch(setUsername(stateUserName));
    onNext();
  };
  return (
    <Card title="Select a username!" icon="goggle-emoji.png">
      <TextInput
        value={stateUserName}
        onChange={(e) => setStateUserName(e.target.value)}
      />
      <p className={styles.bottomParagraph}>
        Select a cool username, but make sure you don't regret this name in the
        future.
      </p>
      <div className={styles.actionButtonWrap}>
        <Button onClick={nextStep} text="Next" />
      </div>
    </Card>
  );
};

export default StepName;
