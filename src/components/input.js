import React from "react";
import styles from "./input.module.css";
import Timer from "./Timer";

const inputArray = [];
const fetchedString = "My name is Sudarshan and I am coming here";

function WordData(word, highlight) {
  this.word = word;
  this.highlight = highlight;
  this.correct = false;
}

const EnrichedTextArray = fetchedString.split(" ").map((word, index) => {
  if (index === 0) return new WordData(word, true);
  return new WordData(word);
});

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
      setStartTimer(true);
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
        if (iterator.current < EnrichedTextArray.length) {
          if (
            inputArray[iterator.current] ===
            EnrichedTextArray[iterator.current]["word"]
          ) {
            EnrichedTextArray[iterator.current]["correct"] = true;
            setCorrectWords((prevCount) => prevCount + 1);
          } else {
            EnrichedTextArray[iterator.current]["correct"] = false;
          }
          iterator.current++;
          setInputValue("");
        }
      }
    }
  }, [recordWord, inputValue]);

  const handleSpaceKey = (e) => {
    if (e.key === " ") {
      if (iterator.current < EnrichedTextArray.length - 1) {
        EnrichedTextArray[iterator.current + 1]["highlight"] = true;
      }
      setRecordWord(true);
    } else {
      setRecordWord(false);
    }
  };
  return (
    <div>
      <p>
        {EnrichedTextArray.map((item, index) => {
          if (item.highlight) {
            return <Word bgColor="grey" data={item.word} />;
          } else if (!item.highlight) {
            return <Word bgColor="none" data={item.word} />;
          }

          return <Word color="none" data={item.word} />;
        })}
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

const Word = ({ color, bgColor, data }) => (
  <span>
    <span
      style={{ padding: "0 2px 0 2px", backgroundColor: bgColor, color: color }}
    >
      {data}
    </span>
    <span>&nbsp;</span>
  </span>
);

export default InputField;
