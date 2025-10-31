import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.note.createMany({
    data: [
      { title: 'Welcome', content: 'Hi! How is it going?' },
      { title: 'Archived', content: 'Hidden note', archived: true },
    ],
    skipDuplicates: true,
  })

  await prisma.tag.createMany({
    data: [{ name: 'Work' }, { name: 'Personal' }, { name: 'Ideas' }],
    skipDuplicates: true,
  })

  const note = await prisma.note.findFirst({ orderBy: { id: 'asc' } })
  const tag = await prisma.tag.findFirst({ where: { name: 'work' } })

  if (note && tag) {
    await prisma.noteTag.upsert({
      where: { noteId_tagId: { noteId: note.id, tagId: tag.id } },
      update: {},
      create: { noteId: note.id, tagId: tag.id },
    })
  }
  console.log('Seed ok: notes + tags')
}

main().finally(() => prisma.$disconnect())
