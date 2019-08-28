import React from 'react';

export const TodosContext = React.createContext({
  todos: [
    // { id: 1, text: "eat", complete: false},
    // { id: 2, text : "work", complete: false},
    // { id: 3, text: "sleep", complete: false},
  ],
  currentTodo: {}
});


