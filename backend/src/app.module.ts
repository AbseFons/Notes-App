import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [NotesModule],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
