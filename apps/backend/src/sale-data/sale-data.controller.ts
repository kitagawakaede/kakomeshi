import { Controller, Get, Param, Post, Body, UploadedFiles, UseInterceptors, BadRequestException } from "@nestjs/common";
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SaleDataService } from "./sale-data.service";

@Controller('sale-data')
export class SaleDataController {
  constructor(private readonly saleDataService: SaleDataService) {}

  @Get()
  async findAll() {
    return this.saleDataService.findAll(); 
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
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
    },
    @UploadedFiles() files: { files?: Express.Multer.File[] },
  ) {
    if (!files?.files) {
      throw new BadRequestException('ファイルがアップロードされていません');
    }
    return this.saleDataService.create(createSaleDataDto, files.files);
  }
}
