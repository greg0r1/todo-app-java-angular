import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

/**
 * Component to display and manage the list of todos.
 * Demonstrates Single Responsibility Principle (SRP) - handles only todo list display and user interactions.
 */
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  currentFilter: 'all' | 'active' | 'completed' = 'all';
  loading = false;
  error: string | null = null;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  /**
   * Load all todos from the backend.
   */
  loadTodos(): void {
    this.loading = true;
    this.error = null;

    this.todoService.getAllTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load todos. Please try again.';
        this.loading = false;
        console.error('Error loading todos:', err);
      }
    });
  }

  /**
   * Toggle the completed status of a todo.
   */
  toggleComplete(todo: Todo): void {
    if (!todo.id) return;

    const updatedTodo = { ...todo, completed: !todo.completed };
    this.todoService.updateTodo(todo.id, updatedTodo).subscribe({
      next: () => {
        todo.completed = !todo.completed;
        this.applyFilter();
      },
      error: (err) => {
        this.error = 'Failed to update todo.';
        console.error('Error updating todo:', err);
      }
    });
  }

  /**
   * Delete a todo.
   */
  deleteTodo(id: number | undefined): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          this.todos = this.todos.filter(t => t.id !== id);
          this.applyFilter();
        },
        error: (err) => {
          this.error = 'Failed to delete todo.';
          console.error('Error deleting todo:', err);
        }
      });
    }
  }

  /**
   * Apply filter to the todos list.
   */
  applyFilter(): void {
    switch (this.currentFilter) {
      case 'active':
        this.filteredTodos = this.todos.filter(t => !t.completed);
        break;
      case 'completed':
        this.filteredTodos = this.todos.filter(t => t.completed);
        break;
      default:
        this.filteredTodos = [...this.todos];
    }
  }

  /**
   * Set the current filter.
   */
  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.currentFilter = filter;
    this.applyFilter();
  }

  /**
   * Get count of active todos.
   */
  getActiveCount(): number {
    return this.todos.filter(t => !t.completed).length;
  }

  /**
   * Get count of completed todos.
   */
  getCompletedCount(): number {
    return this.todos.filter(t => t.completed).length;
  }

  /**
   * Track by function for ngFor optimization.
   */
  trackByTodoId(index: number, todo: Todo): number | undefined {
    return todo.id;
  }
}
