import React from "react";
import styles from "./input.module.css";
import Timer from "./Timer";
import random from "utils/random";
import { v4 as uuidv4 } from "uuid";

const sampleTextData = [
  "My name is Sudarshan and I am coming here",
  "This is going to be a long long paragraph and there is nothing else anyone can do about it",
  "Srini and Raksha are going to do something about it, I know it",
];

function WordData(word, highlight) {
  this.word = word;
  this.highlight = highlight;
  this.correct = false;
}

const createEnrichedTextArray = (string) => {
  return string.split(" ").map((word, index) => {
    if (index === 0) return new WordData(word, true);
    return new WordData(word, false);
  });
};

const getRandomTextData = () => {
  return sampleTextData[random(0, sampleTextData.length)];
};
const InputField = () => {
  const [inputArray, setInputArray] = React.useState([]);
  const [correctWords, setCorrectWords] = React.useState(0);
  const [inputValue, setInputValue] = React.useState("");
  const [recordWord, setRecordWord] = React.useState(false);
  const [startTimer, setStartTimer] = React.useState(false);
  const [textData, setTextData] = React.useState(
    createEnrichedTextArray(getRandomTextData())
  );

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
    setTextData(createEnrichedTextArray(getRandomTextData()));
    setCorrectWords(0);
    setInputArray([]);
    setInputValue("");
    iterator.current = 0;
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  React.useEffect(() => {
    if (recordWord) {
      if (inputValue !== "") {
        inputArray.push(inputValue);
        if (iterator.current < textData.length) {
          if (
            inputArray[iterator.current] === textData[iterator.current]["word"]
          ) {
            textData[iterator.current]["correct"] = true;
            setCorrectWords((prevCount) => prevCount + 1);
          } else {
            textData[iterator.current]["correct"] = false;
          }
          iterator.current++;
          setInputValue("");
        }
      }
    }
  }, [recordWord, inputValue, textData, inputArray]);

  const handleSpaceKey = (e) => {
    if (e.key === " ") {
      if (iterator.current < textData.length - 1) {
        textData[iterator.current + 1]["highlight"] = true;
      }
      setRecordWord(true);
    } else {
      setRecordWord(false);
    }
  };
  return (
    <div>
      <div className={styles.sampleText}>
        <p>
          {textData.map((item, index) => {
            if (item.highlight) {
              return <Word key={uuidv4()} bgColor="grey" data={item.word} />;
            } else if (!item.highlight) {
              return <Word key={uuidv4()} bgColor="none" data={item.word} />;
            }

            return <Word key={uuidv4()} color="none" data={item.word} />;
          })}
        </p>
      </div>
      <input
        ref={inputRef}
        className={styles.inputField}
        autoFocus
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleSpaceKey}
      />
      <p className={styles.correctWords}>Correct words: {correctWords}</p>
      <Timer startTimer={startTimer} resetFields={handleTimerReset} />
    </div>
  );
};

const Word = ({ color, bgColor, data }) => (
  <span>
    <span
      style={{
        padding: "0 2px 0 2px",
        borderRadius: "5px",
        backgroundColor: bgColor,
        color: color,
      }}
    >
      {data}
    </span>
    <span>&nbsp;</span>
  </span>
);

export default InputField;
