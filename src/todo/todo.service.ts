import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { Todo } from './todo.model';
import { SSO_HOST } from 'src/core/config';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('todo') private readonly todoModel: Model<Todo>,
    private readonly httpService: HttpService,
  ) {}

  async createTodo(token: string, title: string, description: string) {
    try {
      const user: AxiosResponse<{ userId: string }> =
        await this.httpService.axiosRef.get(`http://${SSO_HOST}:3000/users/`, {
          withCredentials: true,
          headers: {
            cookie: token,
          },
        });
      if (!user.data.userId) {
        throw new UnauthorizedException('Bad token');
      }
      const newTodo = new this.todoModel({
        ownerId: user.data.userId,
        title,
        description,
      });
      await newTodo.save();
      return newTodo;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getAllMy(token: string) {
    try {
      const user: AxiosResponse<{ userId: string }> =
        await this.httpService.axiosRef.get(`http://${SSO_HOST}:3000/users/`, {
          withCredentials: true,
          headers: {
            cookie: token,
          },
        });
      if (!user.data.userId) {
        throw new UnauthorizedException('Bad token');
      }
      const todos = await this.todoModel.find({ ownerId: user.data.userId });
      return todos;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteOne(token: string, todoId: string) {
    try {
      const candidate = await this.todoModel.findById(todoId);
      if (!candidate) {
        throw new Error('Todo with provided id does not exist.');
      }
      const user: AxiosResponse<{ userId: string }> =
        await this.httpService.axiosRef.get(`http://${SSO_HOST}:3000/users/`, {
          withCredentials: true,
          headers: {
            cookie: token,
          },
        });
      if (!user.data.userId) {
        throw new UnauthorizedException('Bad token');
      }
      if (candidate.ownerId !== user.data.userId) {
        throw new UnauthorizedException('Bad token');
      }
      await this.todoModel.deleteOne({ id: todoId });
      return candidate.id;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
