import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodoModule } from './todo/todo.module';
import { DB_HOST } from './core/config';

@Module({
  imports: [
    TodoModule,
    MongooseModule.forRoot(`mongodb://root:root@${DB_HOST}:27017/`),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
