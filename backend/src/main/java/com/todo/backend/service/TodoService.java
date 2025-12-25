package com.todo.backend.service;

import com.todo.backend.model.Todo;

import java.util.List;
import java.util.Optional;

/**
 * Service interface for Todo business logic.
 * Demonstrates Interface Segregation Principle (ISP) - focused interface for Todo operations.
 * Demonstrates Dependency Inversion Principle (DIP) - high-level module depends on abstraction.
 */
public interface TodoService {

    /**
     * Retrieve all todos.
     */
    List<Todo> getAllTodos();

    /**
     * Retrieve a todo by its ID.
     */
    Optional<Todo> getTodoById(Long id);

    /**
     * Create a new todo.
     */
    Todo createTodo(Todo todo);

    /**
     * Update an existing todo.
     */
    Todo updateTodo(Long id, Todo todo);

    /**
     * Delete a todo by its ID.
     */
    void deleteTodo(Long id);

    /**
     * Get todos by completion status.
     */
    List<Todo> getTodosByStatus(boolean completed);

    /**
     * Search todos by title.
     */
    List<Todo> searchTodosByTitle(String title);
}
