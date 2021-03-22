import React, { useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import { useTodosContext } from "./TodosContext";

const Main = () => {
  const [showTodoForm, setShowTodoForm] = useState(true);
  const {todos, error, loading} = useTodosContext();
  const loadingNode = (
    <div className="h-screen items-center flex justify-center  mx-auto shadow-md">
      <div className="text-center">
        <h1 className="text-5xl">Loading Todo List...</h1>
      </div>
    </div>
  );
  if (loading) {
    return loadingNode;
  }
  return (
    <>
      <div className="max-w-screen-sm mx-auto rounded-md shadow-md bg-gray-100 text-lg">
        <div className="m-2 py-3">
          <h1 className="text-3xl">Todo List</h1>
          <button
            onClick={() => setShowTodoForm((showTodoForm) => !showTodoForm)}
            className={`mb-3 cursor-pointer w-3/12 py-1 text-gray-100 rounded-sm px-2 shadow-md ${
              !showTodoForm
                ? "bg-blue-600 hover:bg-blue-500"
                : "bg-red-600 hover:bg-red-500"
            }`}
          >
            {!showTodoForm ? `Add Todo` : `Hide Todo Form`}
          </button>

          <div className={`${!showTodoForm && "hidden"}`}>
            <AddTodo setShowTodoForm={setShowTodoForm} />
          </div>
        </div>
      </div>
      <div className="max-w-screen-sm bg-gray-100 mx-auto m-2 px-2 py-3 rounded-md shadow-md text-base">
        <TodoList />
      </div>
    </>
  );
};

export default Main;
