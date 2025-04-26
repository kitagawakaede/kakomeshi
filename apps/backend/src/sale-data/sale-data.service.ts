import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class SaleDataService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.saleData.findMany(); 
  }

  async findOne(id: number) {
    return this.prisma.saleData.findUnique({
      where: { saleDataId: Number(id)},
    });
  }

  async create(data: {
    userId: string;
    price: number;
    universityName: string;
    facultyName: string;
    departmentName: string;
    className: string;
    explanation: string;
    Features1: string;
    Features2: string;
    Features3: string;
    someday: string;
    filePath?: string;
  }) {
    // 最後のIDを取得して新しいIDを作成
    const lastSaleData = await this.prisma.saleData.findFirst({
      orderBy: {
        saleDataId: 'desc',
      },
    });
    
    const newId = lastSaleData ? lastSaleData.saleDataId + 1 : 1;
    
    // 型キャストを使用して、コンパイラーエラーを回避
    const createData: any = {
      saleDataId: newId,
      userId: data.userId,
      price: data.price,
      universityName: data.universityName,
      facultyName: data.facultyName,
      departmentName: data.departmentName,
      className: data.className,
      explanation: data.explanation,
      Features1: data.Features1,
      Features2: data.Features2,
      Features3: data.Features3,
      someday: data.someday,
      filePath: data.filePath || null,
    };
    
    return this.prisma.saleData.create({
      data: createData,
    });
  }
}
