import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as fs from 'fs';
import * as path from 'path';
import { Express } from 'express';

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
      userId: string;
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
    const { email, userId, ...dataWithoutEmail } = createSaleDataDto;
    
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
    return this.prisma.saleData.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.saleData.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.saleData.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async update(
    id: number,
    updateSaleDataDto: {
      title: string;
      universityName: string;
      facultyName: string;
      departmentName: string;
      graduationYear: string;
      description: string;
      price: number;
      // examUrl: string; // 必要なら追加
    },
  ) {
    const saleData = await this.prisma.saleData.findUnique({
      where: { id },
    });

    if (!saleData) {
      throw new NotFoundException(`Sale data with ID ${id} not found`);
    }

    // 不要なフィールドが混ざらないように明示的に指定
    return this.prisma.saleData.update({
      where: { id },
      data: {
        title: updateSaleDataDto.title,
        universityName: updateSaleDataDto.universityName,
        facultyName: updateSaleDataDto.facultyName,
        departmentName: updateSaleDataDto.departmentName,
        graduationYear: updateSaleDataDto.graduationYear,
        description: updateSaleDataDto.description,
        price: updateSaleDataDto.price,
        // examUrl: updateSaleDataDto.examUrl, // 必要なら追加
      },
    });
  }

  async remove(id: number) {
    const saleData = await this.prisma.saleData.findUnique({
      where: { id },
    });

    if (!saleData) {
      throw new NotFoundException(`Sale data with ID ${id} not found`);
    }

    // CartItemを先に削除
    await this.prisma.cartItem.deleteMany({
      where: { saleDataId: id },
    });

    // ファイルを削除
    if (saleData.examUrl) {
      try {
        const filePath = path.join(process.cwd(), saleData.examUrl);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (error) {
        console.error('ファイル削除エラー:', error);
        // ファイル削除に失敗してもデータベースからは削除する
      }
    }

    return this.prisma.saleData.delete({
      where: { id },
    });
  }
}
