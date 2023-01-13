import React, { useReducer } from "react";
import Display from "./components/Display";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";
import "./App.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evaluate",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }

      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand:
          state.currentOperand === "0"
            ? `${payload.digit}`
            : `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CLEAR:
      return { currentOperand: "0" };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      if (state.currentOperand == null && payload.operation === "-") {
        return {
          ...state,
          currentOperand: "-",
        };
      }

      if (state.currentOperand == null || state.currentOperand === "-") {
        return {
          ...state,
          operation: payload.operation,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };

    default:
      break;
  }
};

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(previous) || isNaN(current)) return "";
  let result = " ";
  switch (operation) {
    case "+":
      result = previous + current;
      break;

    case "-":
      result = previous - current;
      break;

    case "*":
      result = previous * current;
      break;

    case "/":
      result = previous / current;
      break;

    default:
      break;
  }

  return result.toString();
};

const App = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    { currentOperand: "0" }
  );

  return (
    <div className="App">
      <div className="calculator">
        <Display
          currentOperand={currentOperand}
          previousOperand={previousOperand}
          operation={operation}
        />
        <div className="keys">
          <button id="clear" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
            AC
          </button>
          <OperationButton id="divide" operation="/" dispatch={dispatch} />
          <OperationButton id="multiply" operation="*" dispatch={dispatch} />
          <DigitButton id="seven" digit="7" dispatch={dispatch} />
          <DigitButton id="eight" digit="8" dispatch={dispatch} />
          <DigitButton id="nine" digit="9" dispatch={dispatch} />
          <OperationButton id="subtract" operation="-" dispatch={dispatch} />
          <DigitButton id="four" digit="4" dispatch={dispatch} />
          <DigitButton id="five" digit="5" dispatch={dispatch} />
          <DigitButton id="six" digit="6" dispatch={dispatch} />
          <OperationButton id="add" operation="+" dispatch={dispatch} />
          <DigitButton id="one" digit="1" dispatch={dispatch} />
          <DigitButton id="two" digit="2" dispatch={dispatch} />
          <DigitButton id="three" digit="3" dispatch={dispatch} />
          <button
            id="equals"
            onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
          >
            =
          </button>
          <DigitButton id="zero" digit="0" dispatch={dispatch} />
          <DigitButton id="decimal" digit="." dispatch={dispatch} />
        </div>
      </div>
    </div>
  );
};

export default App;
