import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTodosUpdateContext } from "./TodosContext";
import { message } from "antd";

const AddTodo = ({ setShowTodoForm }) => {
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

    await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });

    (async () => {
      const res = await fetch("http://localhost:5000/todos");
      const data = await res.json();

      message.success("Added New Task");
      setTodos(() => data);
    })();

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
                className="block rounded-sm px-2 border border-transparent focus:outline-none shadow-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
            <div className="block mt-2">
              <input
                className="mr-4 rounded-sm px-2 border border-transparent focus:outline-none shadow-md focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer"
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(() => e.target.value)}
                required
              />

              <input
                className="rounded-sm px-2 border border-transparent focus:outline-none shadow-md focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer"
                type="time"
                name="time"
                value={time}
                onChange={(e) => setTime(() => e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="font-bold">Status</label>
            <div className="block mt-2">
              <select
                className="bg-white rounded-sm px-2 border border-transparent focus:outline-none shadow-md focus:ring-2 focus:ring-blue-600 focus:border-transparent cursor-pointer"
                name="status"
                value={status}
                onChange={(e) => setStatus(() => e.target.value)}
                required
              >
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
          <div>
            <input
              type="submit"
              className="cursor-pointer w-2/12 mr-2 text-gray-100 rounded-sm px-2 shadow-md bg-blue-600"
              value="Submit"
            />
            <button
              className="cursor-pointer w-2/12 mr-2 text-gray-100 rounded-sm px-2 shadow-md bg-red-600"
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
