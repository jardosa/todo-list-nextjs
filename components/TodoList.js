import { message, Tooltip } from "antd";
import React from "react";
import { debounce } from "lodash";
import {
  FaTimes,
  FaAngleDoubleRight,
  FaCheck,
  FaCaretDown,
} from "react-icons/fa";
import formatAMPM from "../utils/formatAMPM";
import { deleteTodo, fetchTodo, updateTodo } from "../utils/TodoUtils";
import {
  useTodosContext,
  useTodosFilterStatusContext,
  useTodosSearchContext,
  useTodosUpdateContext,
} from "./TodosContext";

const TodoList = () => {
  const todos = useTodosContext();
  const setTodos = useTodosUpdateContext();
  const [filterStatus, setFilterStatus] = [...useTodosFilterStatusContext()];
  const [search, setSearch] = [...useTodosSearchContext()];

  const handleSearch = async (value) => {
    const searchVal = value;
    const debouncedSearch = debounce(() => setSearch(() => searchVal), 1000);
    debouncedSearch();
  };

  const handleDelete = async (id) => {
    const res = await deleteTodo(id);
    if (res.status === 200) {
      setTodos(() => todos.filter((todo) => todo.id !== id));
      message.info("A task has been removed");
    } else {
      alert("Error encountered in deleting task");
    }
  };

  const handleFilterStatus = (value) => {
    setFilterStatus(() => value);
  };

  const handleStatusChange = async (id, status) => {
    const task = await fetchTodo(id);
    const updatedTask = { ...task, status };

    const data = await updateTodo(id, updatedTask);

    setTodos((todos) => {
      const newTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, status: data.status } : todo
      );
      return newTodos;
    });
    message.success("Task updated!");
  };

  const searchRegex = new RegExp(`${search}`, "gmi");

  const rows = todos
    .filter(({ title }) => title.match(searchRegex))
    .map((row) => {
      const unformattedDate = new Date(`${row.date} ${row.time}`);
      const correctTime = formatAMPM(unformattedDate);

      return (
        <tr key={row.id}>
          <td className="border border-blue-100">{row.title}</td>
          <td className="border border-blue-100">{`${row.date} at ${correctTime}`}</td>
          <td className="border border-blue-100">{row.status}</td>
          <td className="border border-blue-100">
            {row.status !== "Completed" && (
              <>
                {row.status === "Not Started" && (
                  <Tooltip title="Set task to In Progress">
                    <FaAngleDoubleRight
                      onClick={() => handleStatusChange(row.id, "In Progress")}
                      className="cursor-pointer inline-block mr-1 text-lg text-yellow-400"
                    />
                  </Tooltip>
                )}
                {row.status !== "Not Started" && (
                  <Tooltip title="Complete Task">
                    <FaCheck
                      onClick={() => handleStatusChange(row.id, "Completed")}
                      classNa
                      me="cursor-pointer text-green-600 inline-block mr-1 text-lg"
                    />
                  </Tooltip>
                )}
                <Tooltip title="Delete Task">
                  <FaTimes
                    className="cursor-pointer text-red-600 inline-block mr-1 text-lg"
                    onClick={() => handleDelete(row.id)}
                  />
                </Tooltip>
              </>
            )}
          </td>
        </tr>
      );
    });
  return (
    <div className="space-y-2">
      <div>
        <label className="font-bold text-base">Search By Title</label>
        <div className="relative mt-2">
          <input
            className="px-4 py-2 pr-8 w-full shadow-md bg-white border border-gray-200 rounded leading-tight focus:ring-2 focus:ring-blue-600  focus:outline-none"
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-4 space-y-2">
        <label className="font-bold text-base">Filter By Status</label>
        <div className="relative mt-2">
          <select
            onChange={(e) => handleFilterStatus(e.target.value)}
            defaultValue={filterStatus}
            className="px-4 py-2 pr-8 w-full shadow-md bg-white border border-gray-200 rounded leading-tight  focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <div className="absolute inset-y-0 right-0 px-3 bg-gray-200 rounded-r text-gray-700 flex items-center pointer-events-none">
            <FaCaretDown />
          </div>
        </div>
      </div>
      <div>
        {todos.length > 0 ? (
          <table className="table-fixed w-full bg-white">
            <thead>
              <tr>
                <th className="border border-blue-100 w-2/6">Title</th>
                <th className="border border-blue-100 w-2/6">Date & Time</th>
                <th className="border border-blue-100 w-1/6">Status</th>
                <th className="border border-blue-100 w-1/6">Options</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        ) : (
          "There are no todos"
        )}
      </div>
    </div>
  );
};

export default TodoList;
