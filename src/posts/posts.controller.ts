import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/')
  async createPost(
    @Request() req,
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    const response = await this.postsService.createPost(
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
    const response = await this.postsService.getAllMy(req.headers.cookie);
    return response;
  }

  @Delete('/:postId')
  async deleteOne(@Request() req, @Param('postId') postId: string) {
    const response = await this.postsService.deleteOne(
      req.headers.cookie,
      postId,
    );
    return response;
  }
}
