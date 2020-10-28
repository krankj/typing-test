import React from "react";
import styles from "./input.module.css";
const inputArray = [];
const fetchedString = "My name is Sudarshan and I am coming here";
const textArray = fetchedString.split(" ");

const InputField = () => {
  const [correctWords, setCorrectWords] = React.useState(0);
  const [inputValue, setInputValue] = React.useState("");
  const [isTimerOn, setIsTimerOn] = React.useState(false);
  const [countdown, setCountDown] = React.useState(60);

  React.useEffect(() => {
    let interval;
    if (isTimerOn) {
      interval = setInterval(() => {
        setCountDown((prevCount) => prevCount - 0.1);
      }, 100);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTimerOn]);

  const startTimer = () => {
    setIsTimerOn(true);
  };

  const handleInputChange = (e) => {
    let enteredValue = e.target.value;
    if (enteredValue === " ") {
      setInputValue("");
    } else {
      startTimer();
      setInputValue(enteredValue);
    }
  };

  const handleSpaceKey = (e) => {
    if (e.keyCode === 32) {
      if (inputValue !== "") {
        inputArray.push(inputValue);
        console.log(inputArray);
        if (inputArray[correctWords] === textArray[correctWords]) {
          setCorrectWords((prevCount) => prevCount + 1);
        }
      }
      setInputValue("");
    }
  };
  return (
    <div>
      <p>{fetchedString}</p>
      <input
        className={styles.inputField}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleSpaceKey}
      />
      <p>Correct words: {correctWords}</p>
      <p>Timer: {countdown.toFixed(1)}</p>
    </div>
  );
};

export default InputField;
