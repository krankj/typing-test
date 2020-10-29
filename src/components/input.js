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
  const iterator = React.useRef(0);
  const inputRef = React.useRef();

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

  const handleReset = () => {
    setIsTimerOn(false);
    setCountDown(60);
    iterator.current = 0;
    setCorrectWords(0);
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
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
    if (e.key === " ") {
      if (inputValue !== "") {
        inputArray.push(inputValue);
        console.log(inputArray);
        if (inputArray[iterator.current] === textArray[iterator.current]) {
          setCorrectWords((prevCount) => prevCount + 1);
        }
        iterator.current++;
      }
      setInputValue("");
    }
  };
  return (
    <div>
      <p>{fetchedString}</p>
      <input
        ref={inputRef}
        className={styles.inputField}
        autoFocus
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleSpaceKey}
      />
      <p>Correct words: {correctWords}</p>
      <p>Timer: {countdown.toFixed(1)}</p>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default InputField;
