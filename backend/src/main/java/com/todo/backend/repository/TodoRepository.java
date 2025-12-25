package com.todo.backend.repository;

import com.todo.backend.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Todo entity.
 * Demonstrates Dependency Inversion Principle (DIP) - depends on abstraction (JpaRepository).
 * Spring Data JPA auto-generates implementation at runtime.
 */
@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    /**
     * Find all todos by completion status.
     * Method name follows Spring Data JPA naming convention.
     */
    List<Todo> findByCompleted(boolean completed);

    /**
     * Search todos by title containing the given text (case-insensitive).
     */
    List<Todo> findByTitleContainingIgnoreCase(String title);
}
