import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCartItems(userId: number) {
    console.log(`ユーザーID ${userId} のカートアイテムを取得します`);
    
    // ユーザーの存在確認
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user) {
      console.error(`ユーザーID ${userId} が見つかりません`);
      throw new NotFoundException(`ユーザーID ${userId} が見つかりません`);
    }

    const cartItems = await this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        saleData: true,
      },
    });
    
    console.log(`ユーザーID ${userId} のカートアイテム:`, cartItems);
    return cartItems;
  }

  async addToCart(userId: number, saleDataId: number, quantity: number) {
    console.log(`カートに追加: ユーザーID=${userId}, 商品ID=${saleDataId}, 数量=${quantity}`);
    
    // ユーザーの存在確認
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!user) {
      console.error(`ユーザーID ${userId} が見つかりません`);
      throw new NotFoundException(`ユーザーID ${userId} が見つかりません`);
    }
    
    // 商品の存在確認
    const saleData = await this.prisma.saleData.findUnique({
      where: { id: saleDataId },
    });
    
    if (!saleData) {
      console.error(`商品ID ${saleDataId} が見つかりません`);
      throw new NotFoundException(`商品ID ${saleDataId} が見つかりません`);
    }

    try {
      const existingItem = await this.prisma.cartItem.findFirst({
        where: {
          userId,
          saleDataId,
        },
      });

      if (existingItem) {
        console.log(`既存のカートアイテムを更新: ID=${existingItem.id}`);
        return this.prisma.cartItem.update({
          where: {
            id: existingItem.id,
          },
          data: {
            quantity: existingItem.quantity + quantity,
          },
          include: {
            saleData: true,
          },
        });
      }

      console.log(`新しいカートアイテムを作成`);
      return this.prisma.cartItem.create({
        data: {
          userId,
          saleDataId,
          quantity,
        },
        include: {
          saleData: true,
        },
      });
    } catch (error) {
      console.error('カートアイテム追加エラー:', error);
      throw new BadRequestException('カートに商品を追加できませんでした: ' + error.message);
    }
  }

  async removeFromCart(userId: number, cartItemId: number) {
    console.log(`カートから削除: ユーザーID=${userId}, カートアイテムID=${cartItemId}`);
    
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        userId,
      },
    });

    if (!cartItem) {
      console.error(`カートアイテムID ${cartItemId} が見つかりません`);
      throw new NotFoundException('カートアイテムが見つかりません');
    }

    console.log(`カートアイテムを削除: ID=${cartItemId}`);
    return this.prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });
  }

  async updateQuantity(userId: number, cartItemId: number, quantity: number) {
    console.log(`数量更新: ユーザーID=${userId}, カートアイテムID=${cartItemId}, 数量=${quantity}`);
    
    if (quantity < 1) {
      throw new BadRequestException('数量は1以上を指定してください');
    }
    
    const cartItem = await this.prisma.cartItem.findFirst({
      where: {
        id: cartItemId,
        userId,
      },
    });

    if (!cartItem) {
      console.error(`カートアイテムID ${cartItemId} が見つかりません`);
      throw new NotFoundException('カートアイテムが見つかりません');
    }

    console.log(`カートアイテムの数量を更新: ID=${cartItemId}, 数量=${quantity}`);
    return this.prisma.cartItem.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity,
      },
      include: {
        saleData: true,
      },
    });
  }
} 