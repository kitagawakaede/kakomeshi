import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // デフォルトユーザーの作成（ID=1）
  const defaultUser = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      email: 'user@example.com',
      name: 'テストユーザー',
    },
  });

  console.log('シードデータを作成しました');
  console.log({ defaultUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 