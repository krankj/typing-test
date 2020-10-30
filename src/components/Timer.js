import React from "react";
import styles from "./Timer.module.css";
const Timer = ({ startTimer, resetFields }) => {
  const [isTimerOn, setIsTimerOn] = React.useState(false);
  const [countdown, setCountDown] = React.useState(60);

  React.useEffect(() => {
    if (startTimer) {
      setIsTimerOn(true);
    }
  }, [startTimer]);

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

  const resetTimer = () => {
    setIsTimerOn(false);
    setCountDown(60);
    resetFields();
  };

  return (
    <div className={styles.timer}>
      <p>Timer: {countdown.toFixed(1)}</p>
      <Button resetTimer={resetTimer} />
    </div>
  );
};

const Button = ({ resetTimer }) => (
  <button className={styles.button} onClick={resetTimer}>
    Reset
  </button>
);

export default Timer;
