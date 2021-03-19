import { message } from "antd";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { useTodosContext, useTodosUpdateContext } from "./TodosContext";

const TodoList = () => {
  const todos = useTodosContext();
  const setTodos = useTodosUpdateContext();

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      setTodos(() => todos.filter((todo) => todo.id !== id));
      message.info("A task has been removed");
    } else {
      alert("Error encountered in deleting task");
    }
  };

  const rows = todos.map((row) => {
    return (
      <tr key={row.id}>
        <td className="border border-blue-100">{row.title}</td>
        <td className="border border-blue-100">{`${row.date} at ${row.time}`}</td>
        <td className="border border-blue-100">{row.status}</td>
        <td className="border border-blue-100">
          <FaTimes
            className="btn-delete"
            onClick={() => handleDelete(row.id)}
          />
        </td>
      </tr>
    );
  });
  return (
    <div>
      <div className="mb-4 space-y-2">
        <label className="font-bold text-base">Filter By Status</label>
        <select className="text-base block bg-white rounded-sm px-2 border border-transparent focus:outline-none shadow-md focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer">
          <option value="All">All</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Complete">Complete</option>
        </select>
      </div>
      {todos.length > 0 ? (
        <table className="table-fixed w-full bg-white">
          <thead>
            <tr>
              <th className="border border-blue-100 w-2/6">Title</th>
              <th className="border border-blue-100 w-2/6">Date</th>
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
