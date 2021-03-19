import { message } from "antd";
import React from "react";
import { FaTimes, FaAngleDoubleRight, FaCheck } from "react-icons/fa";
import { deleteTodo, fetchTodo, updateTodo } from "../utils/TodoUtils";
import {
  useTodosContext,
  useTodosFilterStatusContext,
  useTodosUpdateContext,
} from "./TodosContext";

const TodoList = () => {
  const todos = useTodosContext();
  const setTodos = useTodosUpdateContext();
  const [filterStatus, setFilterStatus] = [...useTodosFilterStatusContext()];

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

  const rows = todos.map((row) => {
    return (
      <tr key={row.id}>
        <td className="border border-blue-100">{row.title}</td>
        <td className="border border-blue-100">{`${row.date} at ${row.time}`}</td>
        <td className="border border-blue-100">{row.status}</td>
        <td className="border border-blue-100">
          {row.status !== "Completed" && (
            <>
              {row.status === "Not Started" && (
                <FaAngleDoubleRight
                  onClick={() => handleStatusChange(row.id, "In Progress")}
                  className="cursor-pointer inline-block mr-1 text-lg text-yellow-400"
                />
              )}
              {row.status !== "Not Started" && (
                <FaCheck
                  onClick={() => handleStatusChange(row.id, "Completed")}
                  className="cursor-pointer text-green-600 inline-block mr-1 text-lg"
                />
              )}
              <FaTimes
                className="cursor-pointer text-red-600 inline-block mr-1 text-lg"
                onClick={() => handleDelete(row.id)}
              />
            </>
          )}
        </td>
      </tr>
    );
  });
  return (
    <div>
      <div className="mb-4 space-y-2">
        <label className="font-bold text-base">Filter By Status</label>
        <select
          onChange={(e) => handleFilterStatus(e.target.value)}
          defaultValue={filterStatus}
          className="text-base block bg-white rounded-sm px-2 border border-transparent focus:outline-none shadow-md focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer"
        >
          <option value="All">All</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      {todos.length > 0 ? (
        <table className="table-fixed w-full bg-white">
          <thead>
            <tr>
              <th className="border border-blue-100 w-2/6">Title</th>
              <th className="border border-blue-100 w-2/6">Date And Time</th>
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
  );
};

export default TodoList;
