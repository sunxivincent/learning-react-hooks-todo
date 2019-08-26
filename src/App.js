import React, { useContext, useReducer } from 'react';
import { UserContext } from './index';

const initialState = {
  count: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        count: state.count+1
      };
    case "decrement":
      return {
        count: state.count-1
      };
    case "reset":
      return initialState;
    default:
      return initialState;
  }
}

export default function App() {
  const value = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
        count: {state.count}
        <button className="border p-1 m-1" onClick={() => dispatch({ type: "increment"})}>increment</button>
        <button className="border p-1 m-1" onClick={() => dispatch({ type: "decrement"})}>decrement</button>
        <button className="border p-1 m-1" onClick={() => dispatch({ type: "reset"})}>reset</button>
    </div>
  );
}

