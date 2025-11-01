import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { PrismaService } from './prisma.service';
import { TagsModule } from './tags/tags.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SpaController } from './spa.controller';
import { join } from 'path';

@Module({
  imports: [ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      exclude: ['/api*'],
    }),NotesModule, TagsModule],
  providers: [PrismaService],
  controllers: [SpaController],
  exports: [PrismaService]
})
export class AppModule {}
