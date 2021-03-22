import { Alert, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { request } from "../utils/TodoUtils";

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
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const {
        data,
        res: { status },
      } = await request("GET");
      if (status === 404) {
        setError(true)
        setLoading(false)
        return;
      }
      setTodos(()=> data)
      setLoading(false)
    })();
  }, []);

  return (
    <TodosContext.Provider value={{todos, error, loading}}>
      <TodosFilter.Provider value={{filterStatus, setFilterStatus}}>
        <TodosSearch.Provider value={{search, setSearch}}>
          <TodosUpdate.Provider value={setTodos}>
            {children}
          </TodosUpdate.Provider>
        </TodosSearch.Provider>
      </TodosFilter.Provider>
    </TodosContext.Provider>
  );
}
