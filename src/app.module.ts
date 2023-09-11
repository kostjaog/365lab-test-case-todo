import { Module } from '@nestjs/common';

import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PostsModule,
    MongooseModule.forRoot(
      //database url string
      'mongodb://root:root@localhost:27017/',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
