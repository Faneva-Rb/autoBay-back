import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])], // ← Enregistre le repository
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}