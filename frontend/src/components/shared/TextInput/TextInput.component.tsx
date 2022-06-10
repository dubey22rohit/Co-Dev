import React from "react";
import { TextInputProps } from "./TextInput.model";
import styles from "./TextInput.module.css";

const TextInput = (props: TextInputProps) => {
  return (
    <div>
      <input
        type="text"
        className={styles.input}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default TextInput;
