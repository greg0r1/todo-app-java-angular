import { Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    MatIconModule,
    TodoListComponent,
    TodoFormComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  @ViewChild(TodoListComponent) todoListComponent!: TodoListComponent;

  title = 'Todo App';
  subtitle = 'Spring Boot & Angular with Material Design';

  /**
   * Handle todo created event from the form.
   */
  onTodoCreated(): void {
    // Refresh the todo list
    if (this.todoListComponent) {
      this.todoListComponent.loadTodos();
    }
  }
}
