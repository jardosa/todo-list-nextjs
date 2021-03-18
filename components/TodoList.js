import React from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import { useTodosContext } from "./TodosContext";

const TodoList = () => {
  const todos = useTodosContext();

  console.log("TODOS FROM CONTEXT", todos);
  const rows = todos.map((row) => {
    return (
      <>
        <tr>
          <td>{row.title},</td>
          <td>{`${row.date} at ${row.time}`}</td>
          <td>{row.status}</td>
          <td>
            <FaTimes style={{ color: "red" }} />
          </td>
        </tr>
      </>
    );
  });
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Date</th>
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default TodoList;
