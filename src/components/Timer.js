import React from "react";
import styles from "./Timer.module.css";
import worker from "workerize-loader!./worker"; // eslint-disable-line import/no-webpack-loader-syntax
import WebWorker from "./workerSetup";

const startTimerValue = 3;

const Timer = ({ startTimer, resetFields, isDone, correctWords }) => {
  const [isTimerOn, setIsTimerOn] = React.useState(false);
  const [countdown, setCountDown] = React.useState(startTimerValue);
  const [rate, setRate] = React.useState(0);

  React.useEffect(() => {
    if (startTimer) {
      setIsTimerOn(true);
    }
  }, [startTimer]);

  React.useEffect(() => {
    //let w = new WebWorker(worker);
    let w = worker();
    let interval;
    if (isTimerOn) {
      // interval = setInterval(() => {
      //   setCountDown((prevCount) => Number((prevCount - 0.1).toFixed(1)));
      // }, 100);
      // w.postMessage("start");
      w.addEventListener("message", (e) => {
        if (isTimerOn)
          setCountDown((prevCount) => Number((prevCount - 0.1).toFixed(1)));
      });
      w.tick();
    }
    return () => {
      w.terminate();
    };
  }, [isTimerOn]);

  React.useEffect(() => {
    if (countdown === 0) {
      setIsTimerOn(false);
      isDone();
    } else {
      let multiplier = startTimerValue / (startTimerValue - countdown);
      if (multiplier === Infinity) {
        multiplier = 0;
      }
      setRate(correctWords * multiplier);
    }
  }, [countdown]);

  const resetTimer = () => {
    setIsTimerOn(false);
    setCountDown(startTimerValue);
    resetFields();
  };

  return (
    <div className={styles.timer}>
      <p className={countdown === 0 ? styles.highlight : ""}>
        Timer: {countdown.toFixed(1)} s
      </p>
      <p>Instant Rate: {rate.toFixed(1)} wpm</p>
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
