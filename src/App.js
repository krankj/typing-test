import React from "react";
import "./App.css";
import InputField from "components/input";
import IconContainer from "components/IconContainer";
import { ReactComponent as TypingIcon } from "assets/typing-icon-1.svg";
import usePersistence from "hooks/usePersistence";
import DifficultyBar from "utils/difficultyBar";

function App() {
  const [selectValue, setSelectValue] = usePersistence("difficulty", "easy");
  return (
    <div className="App">
      <div className="appContainer">
        <div className="topBar">
          <IconContainer icon={TypingIcon} text="TYPING TEST" />
          <div className="difficultyContainer">
            <DifficultyBar
              initValue={selectValue}
              setSelectValue={setSelectValue}
            />
          </div>
        </div>

        <div className="appContent">
          <InputField difficulty={selectValue} />
        </div>
      </div>
    </div>
  );
}

export default App;
