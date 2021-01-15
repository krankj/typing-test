import React from "react";
import styles from "./Timer.module.css";
import worker from "workerize-loader!./worker"; // eslint-disable-line import/no-webpack-loader-syntax
import ReactCountdownClock from "react-countdown-clock";
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
    //let interval;
    let w = worker();
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
      //clearInterval(interval);
    };
  }, [isTimerOn]);

  function timerComplete() {
    setIsTimerOn(false);
    isDone();
  }

  function calculateInstantTypingRate() {
    let multiplier = startTimerValue / (startTimerValue - countdown);
    if (multiplier === Infinity) {
      multiplier = 0;
    }
    setRate(correctWords * multiplier);
  }

  React.useEffect(() => {
    if (countdown === 0) {
      timerComplete();
    } else {
      calculateInstantTypingRate();
    }
  }, [countdown]);

  const resetTimer = () => {
    window.location.reload();
    setIsTimerOn(false);
    setCountDown(startTimerValue);
    resetFields();
  };

  return (
    <div className={styles.timer}>
      <div className={styles.roundTimer}>
        <ReactCountdownClock
          seconds={countdown === 0 ? 1 : startTimerValue}
          color={countdown === 0 ? "#ff4a11" : "greenyellow"}
          alpha={0.8}
          size={75}
          showMilliseconds={false}
          fontSize="12px"
          paused={!isTimerOn}
        />
      </div>
      {/* <p className={countdown === 0 ? styles.highlight : ""}>
        Timer: {countdown.toFixed(1)} s
      </p> */}
      <p>Instant Rate: {rate.toFixed(0)} wpm</p>

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
