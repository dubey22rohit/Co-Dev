import React, { useState } from "react";
import Button from "../../../components/shared/Button/Button.component";
import Card from "../../../components/shared/Card/Card.component";
import { useDispatch, useSelector } from "react-redux";
import styles from "./StepAvatar.module.css";
import { setAvatar } from "../../../store/activateSlice";
import { activate } from "../../../http";
import { setAuth } from "../../../store/authSlice";

const StepAvatar = (props: any) => {
  const { username, avatar } = useSelector((state: any) => state.activate);
  const dispatch = useDispatch();

  const [avatarImage, setAvatarImage] = useState<string | ArrayBuffer | null>(
    "/images/monkey-avatar.png"
  );

  const captureImage = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      console.log(reader.result);
      setAvatarImage(reader.result);
      dispatch(setAvatar(reader.result));
    };
  };

  const onSubmit = async () => {
    try {
      const { data } = await activate({ username, avatar });
      console.log("ACTIVATE DATA", data);
      if (data.auth) {
        dispatch(setAuth(data));
      }
    } catch (error) {
      console.log("ACTIVATE ERROR", error);
    }
  };
  return (
    <Card title={`Alright ${username}!`} icon="monkey-emoji.png">
      <p className={styles.subHeading}>Select a cool photo</p>
      <div className={styles.avatarWrapper}>
        <img
          src={avatarImage as string}
          alt="avatarImage"
          className={styles.avatarImage}
        />
      </div>
      <div>
        <input
          type="file"
          id="avatarInput"
          className={styles.avatarInput}
          onChange={captureImage}
        />
        <label htmlFor="avatarInput" className={styles.avatarLabel}>
          Select a different photo.
        </label>
      </div>
      <div className={styles.actionButtonWrap}>
        <Button onClick={onSubmit} text="Next" />
      </div>
    </Card>
  );
};

export default StepAvatar;
