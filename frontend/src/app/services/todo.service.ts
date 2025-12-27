import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

/**
 * Service for Todo CRUD operations.
 * Demonstrates Single Responsibility Principle (SRP) - handles only HTTP communication.
 * Demonstrates Dependency Inversion Principle (DIP) - depends on HttpClient abstraction.
 */
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:8080/api/todos';

  constructor(private http: HttpClient) { }

  /**
   * Get all todos.
   */
  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  /**
   * Get todo by ID.
   */
  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new todo.
   */
  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  /**
   * Update an existing todo.
   */
  updateTodo(id: number, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${id}`, todo);
  }

  /**
   * Delete a todo.
   */
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get todos by completion status.
   */
  getTodosByStatus(completed: boolean): Observable<Todo[]> {
    const params = new HttpParams().set('status', completed.toString());
    return this.http.get<Todo[]>(this.apiUrl, { params });
  }

  /**
   * Search todos by title.
   */
  searchTodosByTitle(query: string): Observable<Todo[]> {
    const params = new HttpParams().set('search', query);
    return this.http.get<Todo[]>(this.apiUrl, { params });
  }
}
