import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div>
      <h1>Todo List</h1>
      <input [(ngModel)]="newTodo" (keyup.enter)="addTodo()" placeholder="Add new todo">
      <button (click)="addTodo()">Add</button>
      <ul>
        <li *ngFor="let todo of todos; let i = index">
          {{ todo }}
          <button (click)="removeTodo(i)">Remove</button>
        </li>
      </ul>
      <p *ngIf="offlineMode">You are currently offline. Changes will be synced when you're back online.</p>
    </div>
  `,
})
export class TodoListComponent implements OnInit {
  todos: string[] = [];
  newTodo: string = '';

  offlineMode: boolean = !navigator.onLine;

  constructor() {
    window.addEventListener('online', () => this.offlineMode = false);
    window.addEventListener('offline', () => this.offlineMode = true);
  }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.push(this.newTodo);
      this.newTodo = '';
      this.saveTodos();
    }
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
    this.saveTodos();
  }
}
