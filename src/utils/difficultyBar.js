import React from "react";

const DifficultyBar = ({ initValue, setSelectValue }) => (
  <>
    <div className="flex">
      <input
        type="radio"
        name="diff"
        id="easy"
        checked={initValue === "easy"}
        value="easy"
        onChange={(e) => {
          setSelectValue(e.target.value);
        }}
      />
      <label htmlFor="easy">Easy</label>
    </div>
    <div className="flex">
      <input
        type="radio"
        name="diff"
        id="moderate"
        checked={initValue === "moderate"}
        value="moderate"
        onChange={(e) => {
          setSelectValue(e.target.value);
        }}
      />
      <label htmlFor="moderate">Moderate</label>
    </div>
    <div className="flex">
      <input
        type="radio"
        name="diff"
        id="hard"
        checked={initValue === "hard"}
        value="hard"
        onChange={(e) => {
          setSelectValue(e.target.value);
        }}
      />
      <label htmlFor="hard">Hard</label>
    </div>
    <div className="flex">
      <input
        type="radio"
        name="diff"
        id="api"
        checked={initValue === "api"}
        value="api"
        onChange={(e) => {
          setSelectValue(e.target.value);
        }}
      />
      <label htmlFor="api">API</label>
    </div>
  </>
);

export default DifficultyBar;
