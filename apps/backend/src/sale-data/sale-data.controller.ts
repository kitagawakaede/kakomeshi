import { Controller, Get, Param } from "@nestjs/common";
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
}
