import React from "react";
import { ButtonProps } from "./Button.model";
import styles from "./Button.module.css";

const Button = (props: ButtonProps) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      <span>Get your username</span>
      <img
        src="/images/arrow-forward.png"
        alt="arrow-forward"
        className={styles.arrow}
      />
    </button>
  );
};

export default Button;
