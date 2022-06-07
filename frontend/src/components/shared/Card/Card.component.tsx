import React from "react";
import { CardProps } from "./Card.model";
import styles from "./Card.module.css";

const Card = (props: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.headingWrapper}>
        <img src={`/images/${props.icon}`} alt={props.title} />
        <h1 className={styles.heading}>{props.title}</h1>
      </div>
      {props.children}
    </div>
  );
};

export default Card;
