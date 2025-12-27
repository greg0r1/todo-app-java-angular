import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

/**
 * Component to display and manage the list of todos.
 * Demonstrates Single Responsibility Principle (SRP) - handles only todo list display and user interactions.
 */
@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  currentFilter: 'all' | 'active' | 'completed' = 'all';
  loading = false;
  error: string | null = null;

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) { }

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
        this.showSnackBar('Failed to load todos', 'error');
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
        this.showSnackBar(todo.completed ? 'Todo completed!' : 'Todo marked as active', 'success');
      },
      error: (err) => {
        this.showSnackBar('Failed to update todo', 'error');
        console.error('Error updating todo:', err);
      }
    });
  }

  /**
   * Delete a todo.
   */
  deleteTodo(id: number | undefined): void {
    if (!id) return;

    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(t => t.id !== id);
        this.applyFilter();
        this.showSnackBar('Todo deleted successfully', 'success');
      },
      error: (err) => {
        this.showSnackBar('Failed to delete todo', 'error');
        console.error('Error deleting todo:', err);
      }
    });
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

  /**
   * Show a snackbar message.
   */
  private showSnackBar(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar']
    });
  }
}
