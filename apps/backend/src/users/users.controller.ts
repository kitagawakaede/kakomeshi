import { Body, Controller, Post, Get, Query, Param, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() userData: { id: string; email: string; name?: string; photoURL?: string }) {
    return this.usersService.createOrUpdateUser(userData);
  }

  @Get('by-email')
  async getUserByEmail(@Query('email') email: string) {
    if (!email) {
      throw new NotFoundException('メールアドレスが指定されていません');
    }

    const user = await this.usersService.getUserByEmail(email);
    
    if (!user) {
      throw new NotFoundException('ユーザーが見つかりません');
    }
    
    return user;
  }

  @Get('by-id/:id')
  async getUserById(@Param('id') id: string) {
    if (!id) {
      throw new NotFoundException('ユーザーIDが指定されていません');
    }

    const user = await this.usersService.getUserById(id);
    
    if (!user) {
      throw new NotFoundException('ユーザーが見つかりません');
    }
    
    return user;
  }
} 