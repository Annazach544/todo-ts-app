import './style.css';
import { TodoList } from './models/TodoList';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div class="container">
    <h1>Min Todo App</h1>

    <form id="todo-form">
      <input type="text" id="task" placeholder="Skriv en uppgift">
      <input type="number" id="priority" min="1" max="3" placeholder="Prioritet">
      <button type="submit">Lägg till</button>
    </form>

    <p id="message"></p>

    <ul id="todo-list"></ul>
  </div>
`;

// 👇 skapa AFTER innerHTML (viktigt)
const todoList = new TodoList();

// 👇 hämta DOM efter render
const form = document.querySelector('#todo-form') as HTMLFormElement;
const taskInput = document.querySelector('#task') as HTMLInputElement;
const priorityInput = document.querySelector('#priority') as HTMLInputElement;
const message = document.querySelector('#message') as HTMLParagraphElement;
const list = document.querySelector('#todo-list') as HTMLUListElement;

function renderTodos() {
  list.innerHTML = "";

  todoList.getTodos().forEach((todo) => {
    const li = document.createElement("li");

    li.textContent = `${todo.task} (prio ${todo.priority})`;

    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const success = todoList.addTodo(
    taskInput.value,
    Number(priorityInput.value)
  );

  if (!success) {
    message.textContent = "Fel input!";
    return;
  }

  message.textContent = "";

  taskInput.value = "";
  priorityInput.value = "";

  renderTodos();
});

