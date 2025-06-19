import { Controller, Get, Param, Post, Body, UploadedFiles, UseInterceptors, BadRequestException, Delete, Put, ParseIntPipe } from "@nestjs/common";
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SaleDataService } from "./sale-data.service";

@Controller('sale-data')
export class SaleDataController {
  constructor(private readonly saleDataService: SaleDataService) {}

  @Get()
  async findAll() {
    return this.saleDataService.findAll(); 
  }

  @Get("user/:userId")
  async findByUserId(@Param("userId") userId: string) {
    return this.saleDataService.findByUserId(userId);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number) {
    return this.saleDataService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 5 }]))
  async create(
    @Body() createSaleDataDto: {
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
    @UploadedFiles() files: { files?: Express.Multer.File[] },
  ) {
    if (!files?.files) {
      throw new BadRequestException('ファイルがアップロードされていません');
    }
    return this.saleDataService.create(createSaleDataDto, files.files);
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number) {
    return this.saleDataService.remove(id);
  }

  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSaleDataDto: {
      title: string;
      universityName: string;
      facultyName: string;
      departmentName: string;
      graduationYear: string;
      description: string;
      price: number;
    },
  ) {
    return this.saleDataService.update(id, updateSaleDataDto);
  }
}
