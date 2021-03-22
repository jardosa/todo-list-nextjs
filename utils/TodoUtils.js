export async function request(method, id = 0, body) {

  const paramsObject = {}
  if (method === 'POST' || 'PUT'){
    paramsObject['method'] = method
    paramsObject['headers'] = {"Content-type": "application/json"}
    paramsObject['body'] = JSON.stringify(body)
  } else {
    paramsObject['method'] = method
  }
  
  const res = await fetch(`http://localhost:5000/todos/${id || ''}`, {
    ...paramsObject
  })

  const data = await res.json();
  return {
    data,
    res
  }

}

/* Combined methods below to request method above */

export async function addTodo(values) {
  await fetch("http://localhost:5000/todos", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(values),
  });
}

export async function fetchTodo(id) {
  const res = await fetch(`http://localhost:5000/todos/${id}`);

  const data = await res.json();

  return data
};

export async function fetchTodos() {
  const res = await fetch("http://localhost:5000/todos");

  const data = await res.json();

  return data
};


export async function updateTodo(id, body) {
  const res = await fetch(`http://localhost:5000/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return data

}

export async function deleteTodo(id) {
  const res = await fetch(`http://localhost:5000/todos/${id}`, {
    method: "DELETE",
  });

  return res
}