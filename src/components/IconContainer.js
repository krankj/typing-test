import React from "react";
import styles from "./IconContainer.module.css";

const IconContainer = ({ icon: Component, text }) => (
  <div className={styles.container}>
    <Component className={styles.icon} />
    <p>{text}</p>
  </div>
);

export default IconContainer;
