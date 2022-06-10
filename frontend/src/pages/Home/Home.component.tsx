import React from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../../components/shared/Button/Button.component";
import Card from "../../components/shared/Card/Card.component";
import styles from "./Home.module.css";

const Home = () => {
  const linkStyle = {
    color: "#0077ff",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
  };

  const history = useHistory();

  const buttonClickHandler = () => {
    history.push("/auth");
  };

  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome Co-Devs!" icon="logo.png">
        <p className={styles.text}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat
          aliquam nemo amet alias unde quasi itaque. Sequi harum doloribus
          dolores ut reprehenderit fuga, iste voluptatem maiores repellendus,
          ratione animi ducimus!
        </p>
        <div>
          <Button text="Get your username" onClick={buttonClickHandler} />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.invite}>Have an invite?</span>
          <Link to={"/login"} style={linkStyle}>
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Home;
