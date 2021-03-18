import { ListContext } from "antd/lib/list";
import React, { useContext, useState } from "react";

const TodosContext = React.createContext();
const TodosUpdate = React.createContext();

export function useTodosContext() {
  return useContext(TodosContext);
}
export function useTodosUpdateContext() {
  return useContext(TodosUpdate);
}

export default function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);

  return (
    <TodosContext.Provider value={todos}>
      <TodosUpdate.Provider value={setTodos}>{children}</TodosUpdate.Provider>
    </TodosContext.Provider>
  );
}
