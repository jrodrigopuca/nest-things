import { Injectable, NotFoundException } from '@nestjs/common';

// Modelo de datos para un Todo
export type Todo = {
  id: number;
  title: string;
  done: boolean;
  createdAt: string;
};

// Servicio para gestionar los Todos
@Injectable()
export class TodosService {
  private todos: Todo[] = [];
  private nextId = 1;

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) throw new NotFoundException(`Todo ${id} not found`);
    return todo;
  }

  create(title: string): Todo {
    const todo: Todo = {
      id: this.nextId++,
      title,
      done: false,
      createdAt: new Date().toISOString(),
    };
    this.todos.push(todo);
    return todo;
  }

  update(id: number, patch: Partial<Pick<Todo, 'title' | 'done'>>): Todo {
    const todo = this.findOne(id);
    if (typeof patch.title === 'string') todo.title = patch.title;
    if (typeof patch.done === 'boolean') todo.done = patch.done;
    return todo;
  }

  remove(id: number): void {
    const idx = this.todos.findIndex((t) => t.id === id);
    if (idx === -1) throw new NotFoundException(`Todo ${id} not found`);
    this.todos.splice(idx, 1);
  }

  clear(): { deleted: number } {
    const deleted = this.todos.length;
    this.todos = [];
    this.nextId = 1;
    return { deleted };
  }
}
