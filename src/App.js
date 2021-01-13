import React from "react";
import "./App.css";
import InputField from "components/input";
import IconContainer from "components/IconContainer";
import { ReactComponent as TypingIcon } from "assets/typing-icon-1.svg";
import usePersistence from "hooks/usePersistence";

function App() {
  const [selectValue, setSelectValue] = usePersistence("difficulty", "easy");
  return (
    <div className="App">
      <div className="appContainer">
        <IconContainer icon={TypingIcon} text="Typing Test" />
        <div className="menuContainer">
          <label htmlFor="selectDifficulty">Difficulty</label>
          <select
            id="selectDifficulty"
            value={selectValue}
            onChange={(e) => {
              setSelectValue(e.target.value);
            }}
            className="menu"
          >
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="hard">Hard</option>
            <option value="api">API</option>
          </select>
        </div>

        <div className="appContent">
          <InputField difficulty={selectValue} />
        </div>
      </div>
    </div>
  );
}

export default App;
