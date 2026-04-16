import './style.scss';
import { TodoList } from './models/TodoList';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div class="container">
    <h1>Todo App</h1>

    <form id="todo-form">
      <input type="text" id="task" placeholder="Skriv en uppgift">
      <select id="priority">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    </select>
      <button type="submit">Lägg till</button>
    </form>

    <p id="message"></p>

    <ul id="todo-list"></ul>
  </div>
`;

const todoList = new TodoList();

const form = document.querySelector('#todo-form') as HTMLFormElement;
const taskInput = document.querySelector('#task') as HTMLInputElement;
const priorityInput = document.querySelector('#priority') as HTMLInputElement;
const message = document.querySelector('#message') as HTMLParagraphElement;
const list = document.querySelector('#todo-list') as HTMLUListElement;

renderTodos();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const success = todoList.addTodo(
    taskInput.value,
    Number(priorityInput.value)
  );

  if (!success) {
    message.textContent = 'Fel input';
    return;
  }

  message.textContent = '';
  taskInput.value = '';
  priorityInput.value = '';

  renderTodos();
});

function renderTodos() {
  list.innerHTML = '';

  todoList.getTodos().forEach((todo, index) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = `
      <span class="todo-text ${todo.completed ? 'done' : ''}">
        ${todo.task} (prio: ${todo.priority})
      </span>
      <div class="todo-actions">
        <button>Ta bort</button>
      </div>
    `;

    li.querySelector('.todo-text')!.addEventListener('click', () => {
      todoList.markTodoCompleted(index);
      renderTodos();
    });

    li.querySelector('button')!.addEventListener('click', (e) => {
      e.stopPropagation();
      todoList.removeTodo(index);
      renderTodos();
    });

    list.appendChild(li);
  });
}