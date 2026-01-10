import {
  Body,
  Header,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import type { Todo } from './todos.service';
import { ResponseInterceptor } from './response.interceptor';

type CreateTodoDto = { title: string };
type UpdateTodoDto = { title?: string; done?: boolean };

@UseInterceptors(ResponseInterceptor)
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
  @Header('Location', '/todos')
  create(@Body() body: CreateTodoDto) {
    //return this.todosService.create(body.title);
    const result = this.todosService.createSmart(body.title);

    if (result.kind === 'created') {
      return { data: result.todo, meta: { duplicate: false } };
    }

    return {
      data: result.todo,
      meta: {
        duplicate: true,
        duplicateOfId: result.duplicateOfId,
      },
    };
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
