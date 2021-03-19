import { ListContext } from "antd/lib/list";
import React, { useContext, useEffect, useState } from "react";

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

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:5000/todos");
      const data = await res.json();

      setTodos(() => data);
    })();
  },[]);

  return (
    <TodosContext.Provider value={todos}>
      <TodosUpdate.Provider value={setTodos}>{children}</TodosUpdate.Provider>
    </TodosContext.Provider>
  );
}
