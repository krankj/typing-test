import React from "react";
import styles from "./input.module.css";
import Timer from "./Timer";
import random from "utils/random";
import { v4 as uuidv4 } from "uuid";

const sampleTextData = [
  "My name is Sudarshan and I am coming here",
  "This is going to be a long long paragraph and there is nothing else anyone can do about it and what if there is something done for the well being then there is absolutely nothing",
  "Srini and Raksha are going to do something about it, I know it",
];

const easyTextData = [
  "he",
  "it",
  "be",
  "something",
  "easy",
  "Indian",
  "girl",
  "boy",
  "feverish",
  "cold",
  "car",
  "drift",
  "radio",
];

const moderateTextData = [
  "procrastinate",
  "indifferent",
  "causation",
  "effects",
  "randomize",
  "jeopardy",
  "agony",
  "interesting",
  "capable",
  "profound",
  "wisdom",
  "knowledge",
];

const hardTextData = [
  "hypocite",
  "gyaan",
  "dictatorial",
  "magnanimous",
  "respectively",
  "humbuzz",
  "pizzas",
  "recklessness",
];

function WordData(word, toVisit) {
  this.word = word;
  this.toVisit = toVisit;
  this.wasCorrect = false;
  this.isCorrect = true;
  this.visited = false;
}

let iterator = 0;

const getRandomTextData = (numberOfWords, difficulty, string) => {
  let arr = [];
  if (string) {
    arr = string
      .split(" ")
      .map((word, index) =>
        index === 0 ? new WordData(word, true) : new WordData(word, false)
      );
  } else {
    for (let i = 0; i < numberOfWords; i++) {
      let randomWord;
      if (difficulty === "easy")
        randomWord = easyTextData[random(0, easyTextData.length)];
      else if (difficulty === "moderate")
        randomWord = moderateTextData[random(0, moderateTextData.length)];
      else randomWord = hardTextData[random(0, hardTextData.length)];
      let wordData;
      if (i === 0) wordData = new WordData(randomWord, true);
      else wordData = new WordData(randomWord, false);
      arr.push(wordData);
    }
  }
  return arr;
};
const InputField = ({ difficulty }) => {
  const [inputArray, setInputArray] = React.useState([]);
  const [correctWords, setCorrectWords] = React.useState(0);
  const [inputValue, setInputValue] = React.useState("");
  const [recordWord, setRecordWord] = React.useState(false);
  const [startTimer, setStartTimer] = React.useState(false);
  const [dummyRender, setDummyRender] = React.useState(0);
  const [textData, setTextData] = React.useState([]);
  const [done, setDone] = React.useState(false);

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

  React.useEffect(() => {
    setTextData(getRandomTextData(90, difficulty));
  }, [difficulty]);

  React.useEffect(() => {
    if (iterator < textData.length) {
      if (!textData[iterator]["word"].startsWith(inputValue)) {
        textData[iterator]["isCorrect"] = false;
      } else {
        textData[iterator]["isCorrect"] = true;
      }
    }
    setDummyRender((prev) => prev + 1);
  }, [inputValue, textData]);

  const handleTimerReset = () => {
    setDone(false);
    setTextData(getRandomTextData(90, difficulty));
    setCorrectWords(0);
    setInputArray([]);
    setInputValue("");
    setStartTimer(false);
    iterator = 0;
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleComplete = () => {
    setTextData([]);
    setInputArray([]);
    setInputValue("");
    iterator = 0;
    setStartTimer(false);
    setDone(true);
  };

  React.useEffect(() => {
    if (recordWord) {
      if (inputValue !== "") {
        if (iterator < textData.length - 1) {
          textData[iterator + 1]["toVisit"] = true;
        }
        inputArray.push(inputValue);
        if (iterator < textData.length) {
          if (inputArray[iterator] === textData[iterator]["word"]) {
            textData[iterator]["wasCorrect"] = true;
            setCorrectWords((prevCount) => prevCount + 1);
          } else {
            textData[iterator]["isCorrect"] = false;
            textData[iterator]["wasCorrect"] = false;
          }
          textData[iterator]["visited"] = true;
          iterator++;
          setInputValue("");
        }
      }
    }
  }, [recordWord, inputValue, textData, inputArray]);

  const handleSpaceKey = (e) => {
    if (e.key === " ") {
      setRecordWord(true);
    } else {
      setRecordWord(false);
    }
  };
  return (
    <div>
      <div className={styles.sampleTextContainer}>
        <div className={styles.sampleText}>
          {textData.map((item) => {
            if (item.visited) {
              if (item.wasCorrect) {
                return <Word key={uuidv4()} color="green" data={item.word} />;
              } else {
                return <Word key={uuidv4()} color="red" data={item.word} />;
              }
            }
            if (item.toVisit) {
              if (item.isCorrect) {
                return <Word key={uuidv4()} bgColor="grey" data={item.word} />;
              } else {
                return <Word key={uuidv4()} bgColor="red" data={item.word} />;
              }
            }

            return <Word key={uuidv4()} color="none" data={item.word} />;
          })}
        </div>
      </div>

      <input
        ref={inputRef}
        className={styles.inputField}
        autoFocus
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleSpaceKey}
        disabled={done}
      />

      <p
        className={`${styles.correctWords} ${
          done ? `${styles.hightlightResult}` : ""
        } `}
      >
        Correct words: {correctWords}
      </p>

      <Timer
        startTimer={startTimer}
        resetFields={handleTimerReset}
        isDone={handleComplete}
      />
    </div>
  );
};

const Word = ({ color, bgColor, data }) => (
  <span>
    <span
      style={{
        padding: "0px 2px 0 2px",
        borderRadius: "3px",
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
