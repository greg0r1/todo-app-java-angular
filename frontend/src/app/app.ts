import { Component } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent, TodoFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  title = 'Todo App - Spring Boot & Angular';

  /**
   * Handle todo created event from the form.
   */
  onTodoCreated(): void {
    // The todo-list component will need to refresh
    // We'll use ViewChild to trigger the refresh
    window.location.reload();
  }
}
