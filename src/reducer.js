import uuidv4 from 'uuid/v4';

export function TodosReducer (state, action) {
  switch (action.type) {
    case "TOGGLE_TODO":
      const toggledTodos = state.todos.map(t => t.id === action.payload.id ?
        { ...action.payload, complete: !action.payload.complete } : t) ;
      return {
        ...state,
        todos: toggledTodos
      };
    case "UPDATE_TODO": {
      const updatedTodo = {...state.currentTodo, text: action.payload};
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
      return {
        ...state,
        todos: removedTodos
      };
    case "ADD_TODO":
      const newTodo = {
        id: uuidv4(),
        text: action.payload,
        complete: false
      };
      const newTodos = [... state.todos, newTodo];
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