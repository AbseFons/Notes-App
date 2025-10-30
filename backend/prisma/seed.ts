import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.note.createMany({
    data: [
      { title: 'Welcome', content: 'Hi! How is it going?' },
      { title: 'Archived', content: 'Hidden note', archived: true },
    ],
  });
  console.log('Seed ok');
}
main().finally(() => prisma.$disconnect());
