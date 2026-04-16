import type { Todo } from "./Todo";

export class TodoList {
  private todos: Todo[];

  constructor() {
    this.todos = [];
    this.loadFromLocalStorage();
  }

addTodo(task: string, priority: number): boolean {
  if (task.trim() === "" || priority < 1 || priority > 3) {
    return false;
  }

  const newTodo: Todo = {
    task: task,
    completed: false,
    priority: priority
  };

  this.todos.push(newTodo);
  this.saveToLocalStorage();

  return true;
}

  markTodoCompleted(todoIndex: number): void {}

  getTodos(): Todo[] {
    return this.todos;
  }

  saveToLocalStorage(): void {}

  loadFromLocalStorage(): void {}
}
