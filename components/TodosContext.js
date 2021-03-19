import React, { useContext, useEffect, useState } from "react";
import { fetchTodos } from "../utils/TodoUtils";

const TodosContext = React.createContext();
const TodosUpdate = React.createContext();
const TodosFilter = React.createContext();

export function useTodosContext() {
  return useContext(TodosContext);
}
export function useTodosUpdateContext() {
  return useContext(TodosUpdate);
}
export function useTodosFilterStatusContext() {
  return useContext(TodosFilter);
}

export default function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    (async () => {
      const data = await fetchTodos();
      if (filterStatus && filterStatus === "All") {
        setTodos(() => data);
      } else {
        setTodos(() => data.filter((todo)=> todo.status === filterStatus ));
      }
    })();
  }, [todos,filterStatus]);

  return (
    <TodosContext.Provider value={todos}>
      <TodosFilter.Provider value={[filterStatus, setFilterStatus]}>
        <TodosUpdate.Provider value={setTodos}>{children}</TodosUpdate.Provider>
      </TodosFilter.Provider>
    </TodosContext.Provider>
  );
}
