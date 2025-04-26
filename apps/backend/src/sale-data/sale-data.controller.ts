import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { SaleDataService } from "./sale-data.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller()
export class SaleDataController {
  constructor(private readonly saleDataService: SaleDataService) {}

  @Get("sale-data")
  findAll() {
    return this.saleDataService.findAll();
  }

  @Get("sale-data/:id")
  findOne(@Param("id") id: string) {
    return this.saleDataService.findOne(+id);
  }

  @Post("sell")
  create(@Body() createSaleDataDto: {
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
    return this.saleDataService.create(createSaleDataDto);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = extname(file.originalname);
          const filename = `${uniqueSuffix}${extension}`;
          callback(null, filename);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      originalName: file.originalname,
      filename: file.filename,
      path: file.path,
    };
  }
}
