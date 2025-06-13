import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClient } from "@prisma/client";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SaleDataService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createSaleDataDto: {
      title: string;
      universityName: string;
      facultyName: string;
      departmentName: string;
      graduationYear: string;
      description: string;
      price: number;
      email: string;
    },
    files: Express.Multer.File[],
  ) {
    // ユーザーの取得
    const user = await this.prisma.user.findUnique({
      where: { email: createSaleDataDto.email },
    });

    if (!user) {
      throw new NotFoundException(`メールアドレス ${createSaleDataDto.email} のユーザーが見つかりません`);
    }

    // ファイルを保存するディレクトリを作成
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // ファイルを保存
    const fileUrls = await Promise.all(
      files.map(async (file) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        const filePath = path.join(uploadDir, fileName);
        await fs.promises.writeFile(filePath, file.buffer);
        return `/uploads/${fileName}`;
      }),
    );

    // データベースに保存
    const { email, ...dataWithoutEmail } = createSaleDataDto;
    
    return this.prisma.saleData.create({
      data: {
        ...dataWithoutEmail,
        price: Number(dataWithoutEmail.price),
        examUrl: fileUrls[0],
        user: {
          connect: { id: user.id }
        }
      },
    });
  }

  async findAll() {
    return this.prisma.saleData.findMany(); 
  }

  async findOne(id: number) {
    return this.prisma.saleData.findUnique({
      where: { id: Number(id) },
    });
  }
}
