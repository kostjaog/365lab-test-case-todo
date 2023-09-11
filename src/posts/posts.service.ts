import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './posts.model';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('post') private readonly postModel: Model<Post>,
    private readonly httpService: HttpService,
  ) {}

  async createPost(token: string, title: string, description: string) {
    try {
      const user: AxiosResponse<{ userId: string }> =
        await this.httpService.axiosRef.get(
          'http://localhost:3000/users/whoami',
          {
            withCredentials: true,
            headers: {
              cookie: token,
            },
          },
        );
      const newPost = new this.postModel({
        ownerId: user.data.userId,
        title,
        description,
      });
      await newPost.save();
      return newPost;
    } catch (err) {
      throw new Error('Unauthorized');
    }
  }

  async getAllMy(token: string) {
    try {
      const user: AxiosResponse<{ userId: string }> =
        await this.httpService.axiosRef.get(
          'http://localhost:3000/users/whoami',
          {
            withCredentials: true,
            headers: {
              cookie: token,
            },
          },
        );
      const posts = await this.postModel.find({ ownerId: user.data.userId });
      return posts;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async deleteOne(token: string, postId: string) {
    try {
      const candidate = await this.postModel.findById(postId);
      if (!candidate) {
        throw new Error('Post with provided id does not exist.');
      }
      const user: AxiosResponse<{ userId: string }> =
        await this.httpService.axiosRef.get(
          'http://localhost:3000/users/whoami',
          {
            withCredentials: true,
            headers: {
              cookie: token,
            },
          },
        );
      if (candidate.ownerId !== user.data.userId) {
        throw new Error('Is not an owner');
      }
      await this.postModel.deleteOne({ id: postId });
      return candidate.id;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
