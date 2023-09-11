import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './posts.model';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'post', schema: PostSchema }]),
    HttpModule,
  ],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
