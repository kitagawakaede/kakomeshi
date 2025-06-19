import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrUpdateUser(userData: { id: string; email: string; name?: string; photoURL?: string }) {
    const { id, email, name, photoURL } = userData;

    try {
      // まずFirebaseのUIDでユーザーを検索
      let existingUser = await this.prisma.user.findUnique({
        where: { id },
      });

      // FirebaseのUIDで見つからない場合は、メールアドレスで検索
      if (!existingUser) {
        existingUser = await this.prisma.user.findUnique({
          where: { email },
        });
      }

      if (existingUser) {
        // ユーザーが存在する場合は更新（FirebaseのUIDで更新）
        return this.prisma.user.update({
          where: { id: existingUser.id },
          data: {
            id, // FirebaseのUIDで更新
            name: name || existingUser.name,
            photoURL: photoURL || existingUser.photoURL,
          },
        });
      } else {
        // 新しいユーザーを作成
        return this.prisma.user.create({
          data: {
            id, // FirebaseのUIDを使用
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
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error('ユーザー取得エラー:', error);
      throw error;
    }
  }

  async getUserById(id: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error('ユーザー取得エラー:', error);
      throw error;
    }
  }
} 