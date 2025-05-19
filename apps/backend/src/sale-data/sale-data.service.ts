import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
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
      hasAnswer: string;
      fileFormat: string;
    },
    files: Express.Multer.File[],
  ) {
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
    return this.prisma.saleData.create({
      data: {
        ...createSaleDataDto,
        price: Number(createSaleDataDto.price),
        hasAnswer: createSaleDataDto.hasAnswer === 'true',
        examUrl: fileUrls[0],
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
