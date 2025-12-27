import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

/**
 * Component for creating new todos.
 * Demonstrates Single Responsibility Principle (SRP) - handles only todo creation form.
 */
@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  @Output() todoCreated = new EventEmitter<void>();

  title = '';
  description = '';
  error: string | null = null;
  isSubmitting = false;

  constructor(private todoService: TodoService) { }

  /**
   * Create a new todo.
   */
  createTodo(): void {
    if (!this.title.trim()) {
      this.error = 'Title is required';
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
        this.todoCreated.emit();
      },
      error: (err) => {
        this.error = 'Failed to create todo. Please try again.';
        this.isSubmitting = false;
        console.error('Error creating todo:', err);
      }
    });
  }
}
