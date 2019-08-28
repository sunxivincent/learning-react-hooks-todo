import uuidv4 from 'uuid/v4';

export function TodosReducer (state, action) {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload
      };
    case "TOGGLE_TODO":
      const toggledTodos = state.todos.map(t => t.id === action.payload.id ? action.payload : t) ;
      return {
        ...state,
        todos: toggledTodos
      };
    case "UPDATE_TODO": {
      const updatedTodo = action.payload;
      const updatedTodoIndex = state.todos.findIndex(t => t.id === updatedTodo.id);
      const updatedTodos = [
        ...state.todos.slice(0, updatedTodoIndex),
        updatedTodo,
        ...state.todos.slice(updatedTodoIndex+1)
      ];
      return {
        ...state,
        todos: updatedTodos,
        currentTodo: {}
      }
    }
    case "REMOVE_TODO":
      const removedTodos = state.todos.filter(t => t.id !== action.payload.id);
      const removedTodo = state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
      return {
        ...state,
        todos: removedTodos,
        currentTodo: removedTodo
      };
    case "ADD_TODO":
      if (!action.payload) {
        return state;
      }
      if (state.todos.findIndex(t => t.text === action.payload) > -1) {
        return state;
      }
      const newTodos = [... state.todos, action.payload];
      return {
        ...state,
        todos: newTodos
      };
    case "SET_CURRENT_TODO":
      return {
        ...state,
        currentTodo: action.payload,
      };
    default:
      return state;
  }
}