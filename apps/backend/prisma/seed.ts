import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // デフォルトユーザーの作成
  const defaultUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'テストユーザー',
    },
  });

  // テスト用の商品データを作成
  const testSaleData = await prisma.saleData.create({
    data: {
      title: '東京大学 工学部 数学 2024年度',
      universityName: '東京大学',
      facultyName: '工学部',
      departmentName: '機械工学科',
      graduationYear: '2024',
      description: '東京大学工学部の数学の過去問です。',
      price: 1500,
      examUrl: '/uploads/test-exam.pdf',
      user: {
        connect: { id: defaultUser.id }
      }
    },
  });

  console.log('シードデータを作成しました');
  console.log({ defaultUser, testSaleData });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 