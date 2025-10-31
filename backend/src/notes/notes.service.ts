import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Note } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateNoteDto): Promise<Note> {
    return this.prisma.note.create({ data });
  }

  async findAll(params: { archived: boolean; q?: string; tag?: string }) {
    const { archived, q, tag } = params;

    const where: any = { archived };

    if (q && q.trim() !== '') {
      where.AND = (where.AND ?? []).concat({
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { content: { contains: q, mode: 'insensitive' } },
        ],
      });
    }

    if (tag && tag.trim() !== '') {
      where.AND = (where.AND ?? []).concat({
        tags: {
          some: { tag: { name: tag } }, 
        },
      });
    }

    return this.prisma.note.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { tags: { include: { tag: true } } },
    });
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.prisma.note.findUnique({ where: { id } });
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  async update(id: number, data: UpdateNoteDto): Promise<Note> {
    try {
      return await this.prisma.note.update({ where: { id }, data });
    } catch {
      throw new NotFoundException('Note not found');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prisma.note.delete({ where: { id } });
    } catch {
      throw new NotFoundException('Note not found');
    }
  }

  async addTags(id: number, names: string[]) {
    return this.prisma.note.update({
      where: { id },
      data: {
        tags: {
          create: names.map((name) => ({
            tag: {
              connectOrCreate: {
                where: { name },
                create: { name }
              }
            }
          }))
        }
      },
      include: { tags: { include: { tag: true } } }
    });
  }

  async removeTag(id: number, tagId: number) {
    return this.prisma.note.update({
      where: { id },
      data: {
        tags: {
          delete: { noteId_tagId: { noteId: id, tagId } }
        }
      },
      include: { tags: true }
    });
  }
}
