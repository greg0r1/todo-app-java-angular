package com.todo.backend.controller;

import com.todo.backend.model.Todo;
import com.todo.backend.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Todo operations.
 * Demonstrates Single Responsibility Principle (SRP) - handles only HTTP requests/responses.
 * Uses Dependency Injection (DIP) - depends on TodoService abstraction.
 */
@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class TodoController {

    private final TodoService todoService;

    /**
     * GET /api/todos - Retrieve all todos
     * Optional query param: ?status=true/false to filter by completion status
     * Optional query param: ?search=keyword to search by title
     */
    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos(
            @RequestParam(required = false) Boolean status,
            @RequestParam(required = false) String search) {

        List<Todo> todos;

        if (status != null) {
            todos = todoService.getTodosByStatus(status);
        } else if (search != null && !search.isEmpty()) {
            todos = todoService.searchTodosByTitle(search);
        } else {
            todos = todoService.getAllTodos();
        }

        return ResponseEntity.ok(todos);
    }

    /**
     * GET /api/todos/{id} - Retrieve a specific todo by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        return todoService.getTodoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * POST /api/todos - Create a new todo
     */
    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        Todo createdTodo = todoService.createTodo(todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTodo);
    }

    /**
     * PUT /api/todos/{id} - Update an existing todo
     */
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        try {
            Todo updatedTodo = todoService.updateTodo(id, todo);
            return ResponseEntity.ok(updatedTodo);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * DELETE /api/todos/{id} - Delete a todo
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        try {
            todoService.deleteTodo(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
