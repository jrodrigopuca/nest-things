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
type Meta = Record<string, unknown>;
interface APIResponse<T> {
  data: T;
  meta: Meta;
}
import { ResponseInterceptor } from './response.interceptor';
import { TimingInterceptor } from './timing.interceptor';

type CreateTodoDto = { title: string };
type UpdateTodoDto = { title?: string; done?: boolean };

@UseInterceptors(ResponseInterceptor, TimingInterceptor)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): APIResponse<Todo[]> {
    return {
      data: this.todosService.findAll(),
      meta: {},
    };
  }

  //Obtener un todo por su ID
  @Get(':id')
  findOne(@Param('id') id: string): APIResponse<Todo> {
    return {
      data: this.todosService.findOne(Number(id)),
      meta: {},
    };
  }

  //Crear un nuevo todo
  @Post()
  @Header('Location', '/todos')
  create(@Body() body: CreateTodoDto): APIResponse<Todo> {
    const result = this.todosService.createSmart(body.title);

    return {
      data: result.todo,
      meta: {
        duplicate: result.kind !== 'created',
        duplicateOfId:
          result.kind !== 'created' ? result.duplicateOfId : undefined,
        location: `/todos/${result.todo.id}`,
      },
    };
  }

  //Marcar como completado o actualizar el título
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateTodoDto,
  ): APIResponse<Todo> {
    return {
      data: this.todosService.update(Number(id), body),
      meta: {},
    };
  }

  //Eliminar un todo por su ID
  @Delete(':id')
  remove(@Param('id') id: string): APIResponse<{ ok: true }> {
    this.todosService.remove(Number(id));
    return {
      data: { ok: true },
      meta: {},
    };
  }

  // opcional: borrar todo en memoria
  @Delete()
  clear(): APIResponse<{ deleted: number }> {
    return {
      data: this.todosService.clear(),
      meta: {},
    };
  }
}
