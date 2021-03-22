import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTodosContext, useTodosUpdateContext } from "./TodosContext";
import { message } from "antd";
import { FaCaretDown } from "react-icons/fa";
import { request } from "../utils/TodoUtils";
import {
  defaultInputStyling,
  defaultButtonStyling,
} from "../styles/stylingDefault";

const AddTodo = ({ setShowTodoForm }) => {
  const [_, error] = [...useTodosContext()];
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState("");

  const setTodos = useTodosUpdateContext();

  const onFinish = async (e) => {
    e.preventDefault();
    const [title, date, time, status] = [...e.target];
    const values = {
      title: title.value,
      date: date.value,
      time: time.value,
      status: status.value,
    };

    await request("POST", _, values);
    const res = await fetch("http://localhost:5000/todos");
    const data = await res.json();

    message.success("Added New Task");
    setTodos(() => data);

    setTitle("");
    setDate("");
    setTime("");
    setStatus("");
  };
  const handleClickDiscard = () => {
    setTitle("");
    setDate("");
    setTime("");
    setStatus("");
    setShowTodoForm(() => false);
  };

  return (
    <div>
      <form onSubmit={onFinish}>
        <div className="space-y-4">
          <div className="block">
            <label className="font-bold">Title</label>
            <div className="mt-2">
              <input
                disabled={error}
                className={[
                  ...defaultInputStyling,
                  error ? "bg-gray-200" : "bg-white",
                  "block",
                ].join(" ")}
                className={`block px-4 py-2 pr-8 w-full shadow-md ${
                  error ? "bg-gray-200" : "bg-white"
                } border border-gray-200 rounded leading-tight focus:ring-2 focus:ring-blue-600 focus:outline-none focus:border-gray-200`}
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(() => e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="font-bold">Date & Time</label>
            <div className="mt-2">
              <div className="inline-block w-1/2">
                <input
                  disabled={error}
                  className={[
                    ...defaultInputStyling,
                    error ? "bg-gray-200" : "bg-white",
                  ].join(" ")}
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(() => e.target.value)}
                  required
                />
              </div>
              <div className="inline-block w-1/2">
                <input
                  disabled={error}
                  className={[
                    ...defaultInputStyling,
                    error ? "bg-gray-200" : "bg-white",
                  ].join(" ")}
                  type="time"
                  name="time"
                  value={time}
                  onChange={(e) => setTime(() => e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <label className="font-bold">Status</label>
            <div className="relative mt-2 overflow-hidden">
              <select
                disabled={error}
                className={[
                  "block",
                  ...defaultInputStyling,
                  error ? "bg-gray-200" : "bg-white",
                ].join(" ")}
                name="status"
                value={status}
                onChange={(e) => setStatus(() => e.target.value)}
                required
              >
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <div
                className={[
                  "absolute",
                  "inset-y-0",
                  "right-0",
                  "px-3",
                  "bg-gray-200",
                  "rounded-r",
                  "text-gray-700",
                  "flex",
                  "items-center",
                  "pointer-events-none",
                  "shadow-md",
                ].join(" ")}
              >
                <FaCaretDown />
              </div>
            </div>
          </div>
          <div>
            <input
              type="submit"
              disabled={error}
              className={[
                ...defaultButtonStyling,
                !error ? "bg-blue-600" : "bg-blue-400",
                !error && "hover:bg-blue-500",
              ].join(" ")}
              value="Submit"
            />
            <button
              disabled={error}
              className={[
                ...defaultButtonStyling,
                !error ? "bg-red-600" : "bg-red-400",
                !error && "hover:bg-red-500",
              ].join(" ")}
              onClick={handleClickDiscard}
            >
              Discard
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
AddTodo.propTypes = {
  setShowTodoForm: PropTypes.func,
};
