/**
 * Todo model interface matching backend entity.
 * Demonstrates Single Responsibility Principle (SRP) - only defines data structure.
 */
export interface Todo {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}
