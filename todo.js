const url = "http:localhost:3000/todos";

// Fetch all the todos in the database
const fetchAllTodos = () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.length > 0) {
        data.forEach((todo) => {
          createTodoElement(todo);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// Create a todo
const createTodo = (text) => {
  const data = JSON.stringify({ text });
  fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      createTodoElement(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Mark a todo as completed
const completeTodo = (id) => {
  fetch(`${url}/${id}`, { method: "PATCH" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Delete a tod
const deleteTodo = (id) => {
  fetch(`${url}/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Load all the todos from the database when the page loads.
fetchAllTodos();

const inputElement = document.getElementById("inputText");
const addBtn = document.getElementById("saveBtn");
const toDoListElement = document.getElementById("list");

const createTodoElement = (todo) => {
  const { isCompleted, text, _id } = todo;
  const listItemElement = document.createElement("li");
  listItemElement.innerHTML = text;
  listItemElement.classList.add(["list-group-item"]);
  isCompleted ? (listItemElement.style.textDecoration = "line-through") : null;

  //When a user clicks: the "✕" btn the list item is deleted & the "✓" btn the list item is displayed with a  ̶S̶t̶r̶i̶k̶e̶-̶t̶h̶r̶o̶u̶g̶h̶
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn", "btn-danger", "btn-sm", "float-right", "ml-1");
  deleteBtn.innerHTML = "✕";
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const confirmDelete = confirm("Are you sure you want to delete this todo?");
    if (confirmDelete) {
      deleteTodo(_id);
      listItemElement.remove();
    }
  });

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("btn", "btn-success", "btn-sm", "float-right");
  doneBtn.innerHTML = "✓";
  doneBtn.addEventListener("click", (e) => {
    e.preventDefault();
    completeTodo(_id);
    listItemElement.style.textDecoration = "line-through";
  });

  listItemElement.appendChild(deleteBtn);
  listItemElement.appendChild(doneBtn);
  toDoListElement.appendChild(listItemElement);
};

// When a user clicks the save btn, capture the input text in the form and store it as a list item variable
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const inputElementValue = inputElement.value;
  if (inputElementValue === "") {
    alert("Please enter a task to do");
  } else {
    createTodo(inputElementValue);
    inputElement.value = "";
  }
});
