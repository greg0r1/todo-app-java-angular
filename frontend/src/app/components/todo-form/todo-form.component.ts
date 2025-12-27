import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

/**
 * Component for creating new todos.
 * Demonstrates Single Responsibility Principle (SRP) - handles only todo creation form.
 */
@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  @Output() todoCreated = new EventEmitter<void>();

  title = '';
  description = '';
  error: string | null = null;
  isSubmitting = false;

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Create a new todo.
   */
  createTodo(): void {
    if (!this.title.trim()) {
      this.error = 'Title is required';
      this.showSnackBar('Title is required', 'error');
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    const newTodo: Todo = {
      title: this.title.trim(),
      description: this.description.trim(),
      completed: false
    };

    this.todoService.createTodo(newTodo).subscribe({
      next: () => {
        this.title = '';
        this.description = '';
        this.isSubmitting = false;
        this.showSnackBar('Todo created successfully!', 'success');
        this.todoCreated.emit();
      },
      error: (err) => {
        this.error = 'Failed to create todo. Please try again.';
        this.isSubmitting = false;
        this.showSnackBar('Failed to create todo', 'error');
        console.error('Error creating todo:', err);
      }
    });
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
