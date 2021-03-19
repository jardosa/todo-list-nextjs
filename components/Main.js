import React, { useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

const Main = () => {
  const [showTodoForm, setShowTodoForm] = useState(true);
  return (
    <>
      <div className="max-w-screen-sm mx-auto rounded-md shadow-md bg-gray-100 text-lg">
        <div className="m-2 py-3">
          <h1 className="text-3xl">Todo List</h1>
          <button
            onClick={() => setShowTodoForm((showTodoForm) => !showTodoForm)}
            className={`mb-3 cursor-pointer w-3/12 text-gray-100 rounded-sm px-2 shadow-md ${
              !showTodoForm ? "bg-blue-600" : "bg-red-600"}`}
          >
            {!showTodoForm ? `Add Todo` : `Hide Todo Form`}
          </button>

          {showTodoForm && <AddTodo setShowTodoForm={setShowTodoForm} />}
        </div>
      </div>
      <div className="max-w-screen-sm bg-gray-100 mx-auto m-2 px-2 py-3 rounded-md shadow-md text-base">
        <TodoList />
      </div>
    </>
  );
};

export default Main;
