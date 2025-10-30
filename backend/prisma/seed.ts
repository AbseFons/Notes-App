import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.note.createMany({
    data: [
      { title: 'Bienvenido', content: 'Tu primera nota' },
      { title: 'Archivada', content: 'Ejemplo', archived: true },
    ],
  });
  console.log('✅ Seed ok');
}
main().finally(() => prisma.$disconnect());
