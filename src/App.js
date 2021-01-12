import "./App.css";
import InputField from "components/input";
import IconContainer from "components/IconContainer";
import { ReactComponent as TypingIcon } from "assets/typing-icon-1.svg";

function App() {
  return (
    <div className="App">
      <div className="appContainer">
        <IconContainer icon={TypingIcon} text="Typing Test" />

        <div className="appContent">
          <InputField />
        </div>
      </div>
    </div>
  );
}

export default App;
