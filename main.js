const form = document.querySelector("#form");
const typeInput = document.querySelector(".input");
const toggleAll = document.querySelector(".toggle__all");
const toggleAllcheckbox = document.querySelector(".toggle__all-checkbox")
const todoList = document.querySelector(".todo__list");
const todoItem = document.querySelector(".todo__item");

const deleteBtn = document.querySelector(".destroy");
const filterSection = document.querySelector(".todo__filter");
const todoCounter = document.querySelector(".todo__filter-counter");
const filterAll = document.querySelector(".todo__filter-all");
const filterActive = document.querySelector(".todo__filter-active");
const filterCompleted = document.querySelector(".todo__filter-completed");
const completedDelete = document.querySelector(".todo__filter-clearall");

let todos = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();
  addTodo(typeInput.value);
});

function addTodo(item) {
  if (item !== "") {
    const todo = {
      id: Date.now(),
      text: item,
      completed: false,
    };

    todos.push(todo);

    addToLocalStorage(todos);
    typeInput.value = "";
  }
}

function renderTodos(todos) {
  todoList.innerHTML = "";

  const todosCompleted = todos.filter( item => {
    return item.completed === false
  })

  todos.forEach((todo) => {
    const checked = todo.completed ? "checked" : null;

    const li = document.createElement("li");
    li.setAttribute("class", "todo__item");
    li.setAttribute("data-id", todo.id);

    li.innerHTML = `<label class="todo__item-checkbox">
         <input type="checkbox" class="todo__checkbox" ${checked}/>
         <span class="checkmark"></span>
        </label>
         <span>${todo.text}</span>
        <button class="destroy"></button>`;

    if (todo.completed === true) {
      li.style.textDecoration = "line-through";
      li.style.color = "#d9d9d9";
    }

    if (todosCompleted.length === 1) {
      todoCounter.textContent = `${todosCompleted.length} item left`;
    } else if (todosCompleted.length > 1) {
      todoCounter.textContent = `${todosCompleted.length} items left`;
    }  else {
      todoCounter.textContent = `0 items left`
    }

    todoList.append(li);
  });
}

function addToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));

  const filtered = todos.filter( item => {
    return item.completed === true
  })

  if (todos.length > 0) {
    filterSection.classList.remove("hidden");
    toggleAll.classList.remove("hidden");
  } else {
    toggleAll.classList.add("hidden");
    filterSection.classList.add("hidden");
  }

  filtered.length > 0 ? completedDelete.classList.remove("hidden") : completedDelete.classList.add("hidden")

  renderTodos(todos);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem("todos");

  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

function toggle(id) {
  todos.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

function deleteTodo(id) {
  todos = todos.filter(function (item) {
    return item.id != id;
  });

  addToLocalStorage(todos);
}

todoList.addEventListener("click", function (event) {
  if (event.target.previousElementSibling.type === "checkbox") {
    toggle(event.target.parentElement.parentElement.getAttribute("data-id"));
  }

  if (event.target.classList.contains("destroy")) {
    deleteTodo(event.target.parentElement.getAttribute("data-id"));
  }
});

toggleAll.addEventListener("change", () => {

  if (toggleAllcheckbox.checked) {
  todos.forEach((todo) => {
    todo.completed = true
  }); }
  else {
    todos.forEach((todo) => {
      todo.completed = false
    })
  }

  

  addToLocalStorage(todos);
});

filterAll.addEventListener("click", () => {
  renderTodos(todos)
});

filterActive.addEventListener("click", () => {
  const active = todos.filter( item => {
    return item.completed === false
  })

  renderTodos(active)
});

filterCompleted.addEventListener("click", () => {
  const completed = todos.filter( item => {
    return item.completed === true
  })

  renderTodos(completed)
});

completedDelete.addEventListener("click", () => {
  todos.forEach((todo) => {
    if (todo.completed === true) {
      deleteTodo(todo.id);
    }
  });
});

getFromLocalStorage();