import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { PrismaService } from './prisma.service';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [NotesModule, TagsModule],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
