import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [ArticlesModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
