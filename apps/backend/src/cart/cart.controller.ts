import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart() {
    // 一時的に固定のユーザーIDを使用
    const dummyUserId = 1;
    return this.cartService.getCartItems(dummyUserId);
  }

  @Post('add')
  async addToCart(
    @Body() body: { saleDataId: number; quantity: number },
  ) {
    // 一時的に固定のユーザーIDを使用
    const dummyUserId = 1;
    return this.cartService.addToCart(dummyUserId, body.saleDataId, body.quantity);
  }

  @Delete(':id')
  async removeFromCart(@Param('id', ParseIntPipe) cartItemId: number) {
    console.log(`カート削除リクエスト受信: カートアイテムID=${cartItemId}`);
    
    // 一時的に固定のユーザーIDを使用
    const dummyUserId = 1;
    const result = await this.cartService.removeFromCart(dummyUserId, cartItemId);
    console.log('削除結果:', result);
    return result;
  }

  @Post('update/:id')
  async updateQuantity(
    @Param('id', ParseIntPipe) cartItemId: number,
    @Body() body: { quantity: number },
  ) {
    // 一時的に固定のユーザーIDを使用
    const dummyUserId = 1;
    return this.cartService.updateQuantity(dummyUserId, cartItemId, body.quantity);
  }
} 