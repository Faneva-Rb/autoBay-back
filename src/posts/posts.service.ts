import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {

  constructor(private prisma: PrismaService) { }

  async create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({ data: createPostDto })
  }

  async findAll() {
    return this.prisma.post.findMany();
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } })
    if (!post) throw new NotFoundException("Post non trouvé")
    return post
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id)
    if (!post) throw new NotFoundException("Post non trouvé")

    return this.prisma.post.update({
      data: updatePostDto,
      where: { id }
    })
  }

  async remove(id: number) {
    return this.prisma.post.delete({ where: { id } })
  }
}
