import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

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

}
