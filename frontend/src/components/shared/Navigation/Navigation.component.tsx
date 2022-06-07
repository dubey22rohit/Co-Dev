import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };

  const navHeading = {
    marginLeft: "10px",
  };

  return (
    <nav className={`${styles.navbar} container`}>
      <Link to={"/"} style={linkStyle}>
        <img src="/images/logo.png" alt="Codev logo" />
        <span style={navHeading}>Co-DEV</span>
      </Link>
    </nav>
  );
};

export default Navigation;
