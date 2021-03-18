import React, { useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

const Main = () => {
  return (
    <div className="max-w-lg mx-auto border-red">
      <h1 className="text-3xl">Todo List</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default Main;
