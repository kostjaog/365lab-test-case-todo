import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from './todo.model';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'todo', schema: TodoSchema }]),
    HttpModule,
  ],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
