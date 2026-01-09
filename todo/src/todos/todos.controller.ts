import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import type { Todo } from './todos.service';

type CreateTodoDto = { title: string };
type UpdateTodoDto = { title?: string; done?: boolean };

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  //Obtener un todo por su ID
  @Get(':id')
  findOne(@Param('id') id: string): Todo {
    return this.todosService.findOne(Number(id));
  }

  //Crear un nuevo todo
  @Post()
  create(@Body() body: CreateTodoDto): Todo {
    return this.todosService.create(body.title);
  }

  //Marcar como completado o actualizar el título
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateTodoDto): Todo {
    return this.todosService.update(Number(id), body);
  }

  //Eliminar un todo por su ID
  @Delete(':id')
  remove(@Param('id') id: string): { ok: true } {
    this.todosService.remove(Number(id));
    return { ok: true };
  }

  // opcional: borrar todo en memoria
  @Delete()
  clear() {
    return this.todosService.clear();
  }
}
