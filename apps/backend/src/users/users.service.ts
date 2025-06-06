import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../../lib/prisma';

@Injectable()
export class UsersService {
  async createOrUpdateUser(userData: { email: string; name?: string; photoURL?: string }) {
    const { email, name, photoURL } = userData;

    try {
      // 既存のユーザーを検索
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        // ユーザーが存在する場合は更新
        return prisma.user.update({
          where: { email },
          data: {
            name: name || existingUser.name,
            photoURL: photoURL || existingUser.photoURL,
          },
        });
      } else {
        // 新しいユーザーを作成
        return prisma.user.create({
          data: {
            email,
            name,
            photoURL,
          },
        });
      }
    } catch (error) {
      console.error('ユーザー作成/更新エラー:', error);
      throw error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error('ユーザー取得エラー:', error);
      throw error;
    }
  }
} 