import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { SaleDataModule } from './sale-data/sale-data.module';
import { MulterModule } from '@nestjs/platform-express';
import { CartModule } from './cart/cart.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PrismaModule,
    SaleDataModule,
    MulterModule.register({
      dest: './uploads',
    }),
    CartModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
