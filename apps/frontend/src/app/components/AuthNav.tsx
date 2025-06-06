"use client";

import Link from 'next/link';
import { Button } from "@/app/components/ui/button";
import { User, PlusCircle, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import Image from 'next/image';

export default function AuthNav() {
  // TODO: Firebase Authを実装後に置き換え
  const isAuthenticated = false;
  
  return (
    <div className="flex items-center gap-2">
      <Link href="/sell">
        <Button size="sm" className="hidden md:flex items-center gap-1">
          <PlusCircle className="w-4 h-4" />
          <span>出品する</span>
        </Button>
      </Link>
      
      {!isAuthenticated ? (
        <Link href="/login">
          <Button variant="ghost" size="sm">
            ログイン
          </Button>
        </Link>
      ) : null}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
            <span className="sr-only">ユーザーメニュー</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {isAuthenticated ? (
            <>
              <DropdownMenuLabel>
                ユーザーさん
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile">
                <DropdownMenuItem>
                  マイプロフィール
                </DropdownMenuItem>
              </Link>
              <Link href="/orders">
                <DropdownMenuItem>
                  注文履歴
                </DropdownMenuItem>
              </Link>
              <Link href="/settings">
                <DropdownMenuItem>
                  設定
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => console.log('ログアウト処理')}>
                <LogOut className="w-4 h-4 mr-2" />
                ログアウト
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuLabel>マイアカウント</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/login">
                <DropdownMenuItem>
                  ログイン
                </DropdownMenuItem>
              </Link>
              <Link href="/register">
                <DropdownMenuItem>
                  アカウント登録
                </DropdownMenuItem>
              </Link>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 