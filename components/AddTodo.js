import React from "react";
import PropTypes from "prop-types";
import { useTodosUpdateContext } from "./TodosContext";

const AddTodo = () => {
  const setTodos = useTodosUpdateContext();
  const onFinish = (e) => {
    e.preventDefault();
    const [title, date, time, status] = [...e.target];
    const values = {
      title: title.value,
      date: date.value,
      time: time.value,
      status: status.value,
    };
    console.log(values);
    
    setTodos((todos) => {
      const newTodos = [...todos, { ...values }]
      return newTodos;
    });
  };
  const handleClickDiscard = () => {};

  const validateMessages = { required: "${name} is required." };

  return (
    <div>
      <form onSubmit={onFinish}>
        <div>
          <label>Task</label>
          <input type="text" />
        </div>
        <div>
          <label>Date</label>
          <input type="date" />
        </div>
        <div>
          <label>Time</label>
          <input type="time" />
        </div>
        <div>
          <label>Status</label>
          <select>
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <div>
          <input type="submit" className="btn btn-block" />
        </div>
      </form>
    </div>
  );
};

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default AddTodo;
