import React, { useContext, useReducer, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { TodosContext } from './context';
import { TodosReducer }from './reducer';
import { TodoList} from "./component/TodoList";
import { TodoForm} from "./component/TodoForm";
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

const useAPI = endpoint => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  };
  return data;
};

const App = () => {
  const todos = useContext(TodosContext);
  const [state, dispatch] = useReducer(TodosReducer,     todos);
  const savedTodos = useAPI("https://hooks-api.xs1990.now.sh/todos");

  useEffect(() => {
    dispatch({
      type: "GET_TODOS",
      payload: savedTodos,
    })
  }, [savedTodos]);

  return (
    // when calling useContext(TodosContext) in the TodoList
    // its value is no longer = todos but determined by the value
    // prop above it
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm/>
      <TodoList/>
    </TodosContext.Provider>
  );
};

ReactDOM.render(
  <App/>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
