import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('/')
  async createTodo(
    @Request() req,
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    const response = await this.todoService.createTodo(
      req.headers.cookie,
      title,
      description,
    );
    return {
      id: response.id,
    };
  }
  @Get('/')
  async getAllMy(@Request() req) {
    const response = await this.todoService.getAllMy(req.headers.cookie);
    return response;
  }

  @Delete('/:todoId')
  async deleteOne(@Request() req, @Param('todoId') todoId: string) {
    const response = await this.todoService.deleteOne(
      req.headers.cookie,
      todoId,
    );
    return response;
  }
}
