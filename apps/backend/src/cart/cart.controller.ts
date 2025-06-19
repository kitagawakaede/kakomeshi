import { Controller, Get, Post, Delete, Body, Param, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { CartService } from './cart.service';
import { UsersService } from '../users/users.service';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly usersService: UsersService
  ) {}

  @Get()
  async getCart(@Query('email') email: string) {
    if (!email) {
      throw new BadRequestException('メールアドレスが必要です');
    }

    // メールアドレスからユーザーを取得
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException(`メールアドレス ${email} のユーザーが見つかりません`);
    }

    return this.cartService.getCartItems(user.id);
  }

  @Post('add')
  async addToCart(
    @Body() body: { saleDataId: number; quantity: number; email: string },
  ) {
    if (!body.email) {
      throw new BadRequestException('メールアドレスが必要です');
    }

    // メールアドレスからユーザーを取得
    const user = await this.usersService.getUserByEmail(body.email);
    if (!user) {
      throw new NotFoundException(`メールアドレス ${body.email} のユーザーが見つかりません`);
    }

    return this.cartService.addToCart(user.id, body.saleDataId, body.quantity);
  }

  @Delete(':id')
  async removeFromCart(
    @Param('id') cartItemId: number,
    @Query('email') email: string
  ) {
    if (!email) {
      throw new BadRequestException('メールアドレスが必要です');
    }

    // メールアドレスからユーザーを取得
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException(`メールアドレス ${email} のユーザーが見つかりません`);
    }

    console.log(`カート削除リクエスト受信: ユーザーID=${user.id}, カートアイテムID=${cartItemId}`);
    const result = await this.cartService.removeFromCart(user.id, cartItemId);
    console.log('削除結果:', result);
    return result;
  }

  @Post('update/:id')
  async updateQuantity(
    @Param('id') cartItemId: number,
    @Body() body: { quantity: number; email: string },
  ) {
    if (!body.email) {
      throw new BadRequestException('メールアドレスが必要です');
    }

    // メールアドレスからユーザーを取得
    const user = await this.usersService.getUserByEmail(body.email);
    if (!user) {
      throw new NotFoundException(`メールアドレス ${body.email} のユーザーが見つかりません`);
    }

    return this.cartService.updateQuantity(user.id, cartItemId, body.quantity);
  }
} 