import React, { useContext, useEffect, useState } from "react";
import { fetchTodos } from "../utils/TodoUtils";

const TodosContext = React.createContext();
const TodosUpdate = React.createContext();
const TodosFilter = React.createContext();
const TodosSearch = React.createContext();

export function useTodosContext() {
  return useContext(TodosContext);
}
export function useTodosUpdateContext() {
  return useContext(TodosUpdate);
}
export function useTodosFilterStatusContext() {
  return useContext(TodosFilter);
}

export function useTodosSearchContext() {
  return useContext(TodosSearch);
}

export default function TodosProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      const data = await fetchTodos();
      if (filterStatus && filterStatus === "All") {
        setTodos(() => data);
      } else {
        setTodos(() => data.filter((todo) => todo.status === filterStatus));
      }
    })();
  }, [filterStatus, search]);

  return (
    <TodosContext.Provider value={todos}>
      <TodosFilter.Provider value={[filterStatus, setFilterStatus]}>
        <TodosSearch.Provider value={[search, setSearch]}>
          <TodosUpdate.Provider value={setTodos}>
            {children}
          </TodosUpdate.Provider>
        </TodosSearch.Provider>
      </TodosFilter.Provider>
    </TodosContext.Provider>
  );
}
