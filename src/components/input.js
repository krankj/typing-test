import React from "react";
import styles from "./input.module.css";

const InputField = () => {
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div>
      <input
        className={styles.inputField}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p>Entered value: {inputValue} </p>
    </div>
  );
};

export default InputField;
