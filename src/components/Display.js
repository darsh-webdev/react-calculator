import React from "react";

const Display = ({ currentOperand, previousOperand, operation }) => {
  return (
    <div className="output">
      <span className="result">
        {previousOperand} {operation}
      </span>
      <span id="display" className="input">
        {currentOperand}
      </span>
    </div>
  );
};

export default Display;
