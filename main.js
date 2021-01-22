const form = document.querySelector("#form");
const textInput = document.querySelector(".input");
const toggleAll = document.querySelectorAll(".toggle__all");
const todoList = document.querySelector(".todo__list");
const todoItem = document.querySelectorAll(".todo__item");
const todoCheckbox = document.querySelectorAll(".todo__item-checkbox");
const deleteBtn = document.querySelectorAll(".destroy");
const todoCounter = document.querySelector(".todo__filter-counter");
const filterAll = document.querySelectorAll(".todo__filter-all");
const filterActive = document.querySelectorAll(".todo__filter-active");
const filterCompleted = document.querySelectorAll(".todo__filter-completed");
const completedDelete = document.querySelectorAll("todo__filter-clear");

let todos = [];


const addTodo = (text) => {
  const todo = {
    id: new Date().getTime(),
    text,
    isCompleted: false,
  };
  todos.push(todo);
  renderTodo(todo);
};

form.addEventListener("submit", event => {
  event.preventDefault();

  const text = textInput.value.trim();

  if (text !== '') {
    addTodo(text);
    textInput.value = '';
  }
})

function renderTodo(todo) {
  const li = document.createElement("li");
  li.setAttribute("class", "todo__item");
  li.setAttribute("data-id", todo.id);


  li.innerHTML = `<label class="todo__item-checkbox">
         <input type="checkbox" ${todo.isCompleted}/>
         <span class="checkmark"></span>
        </label>
         <span>${todo.text}</span>
        <button class="destroy"></button>`;


  todoList.append(li);

  if (todos.length === 1) {
    todoCounter.textContent = `${todos.length} item left`
  } else if (todos.length > 1) {
    todoCounter.textContent = `${todos.length} items left`
  }
  
};












