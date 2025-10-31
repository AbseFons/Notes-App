import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Post()
  create(@Body() dto: CreateNoteDto) {
    return this.notesService.create(dto);
  }

  @Get()
  findAll(
    @Query('archived') archived: string,
    @Query('q') q?: string,
    @Query('tag') tag?: string,
  ) {
    // archived viene como "true"/"false"
    const archivedBool = String(archived) === 'true';
    return this.notesService.findAll({ archived: archivedBool, q, tag });
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNoteDto) {
    return this.notesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }

  @Post(':id/tags')
  addTags(@Param('id') id: string, @Body() body: { names: string[] }) {
    return this.notesService.addTags(+id, body.names ?? []);
  }

  @Delete(':id/tags/:tagId')
  removeTag(@Param('id') id: string, @Param('tagId') tagId: string) {
    return this.notesService.removeTag(+id, +tagId);
  }
}
