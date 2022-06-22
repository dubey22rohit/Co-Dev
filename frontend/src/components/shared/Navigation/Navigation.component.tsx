import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../http";
import { setAuth } from "../../../store/authSlice";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state: any) => state.auth);

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

  const handleLogout = async () => {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {}
  };
  return (
    <nav className={`${styles.navbar} container`}>
      <Link to={"/"} style={linkStyle}>
        <img src="/images/logo.png" alt="Codev logo" />
        <span style={navHeading}>Co-DEV</span>
      </Link>
      {isAuth && (
        <div className={styles.navRight}>
          <h3>{user.name}</h3>
          <Link to="/">
            <img
              className={styles.avatar}
              src={user.avatar ? user.avatar : "/images/monkey-avatar.png"}
              width="40"
              height="40"
              alt="avatar"
            />
          </Link>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <img src="/images/logout.png" alt="logout" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
