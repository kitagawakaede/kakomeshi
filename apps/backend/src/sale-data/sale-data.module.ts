import { Module } from "@nestjs/common";
import { SaleDataController } from "./sale-data.controller";
import { SaleDataService } from "./sale-data.service";

@Module({
    controllers: [SaleDataController],
    providers: [SaleDataService],
  })
  export class SaleDataModule {}
  