import React from "react";
import styles from "./input.module.css";
import Timer from "./Timer";

const inputArray = [];
const fetchedString = "My name is Sudarshan and I am coming here";
const textArray = fetchedString.split(" ");

const InputField = () => {
  const [correctWords, setCorrectWords] = React.useState(0);
  const [inputValue, setInputValue] = React.useState("");
  const [recordWord, setRecordWord] = React.useState(false);
  const [startTimer, setStartTimer] = React.useState(false);

  const iterator = React.useRef(0);
  const inputRef = React.useRef();

  const handleInputChange = (e) => {
    let enteredValue = e.target.value;
    if (enteredValue === " ") {
      setInputValue("");
    } else {
      setInputValue(enteredValue);
    }
  };

  const handleTimerReset = () => {
    setCorrectWords(0);
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  React.useEffect(() => {
    if (recordWord) {
      if (inputValue !== "") {
        inputArray.push(inputValue);
        console.log(inputArray);
        if (inputArray[iterator.current] === textArray[iterator.current]) {
          setCorrectWords((prevCount) => prevCount + 1);
        }
        iterator.current++;
        setInputValue("");
      }
    }
  }, [recordWord, inputValue]);

  const handleSpaceKey = (e) => {
    if (e.key === " ") {
      setRecordWord(true);
    } else {
      setStartTimer(true);
      setRecordWord(false);
    }
  };
  return (
    <div>
      <p>
        {textArray.map((word) => (
          <span>{word}&nbsp;</span>
        ))}
      </p>
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
      <Timer startTimer={startTimer} resetFields={handleTimerReset} />
    </div>
  );
};

export default InputField;
