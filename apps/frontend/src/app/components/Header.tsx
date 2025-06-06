import { useState } from "react";
import { useFirebaseUser } from "@/hooks/useFirebaseUser";
import { signInWithGoogle, signOut } from "@/lib/firebaseAuth";
import Link from "next/link";
import Image from "next/image";
import { User, LogOut, LogIn, ShoppingCart, Menu, GraduationCap, PlusCircle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, loading } = useFirebaseUser();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("ログインエラー:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-sky-50 to-indigo-50 border-b">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <GraduationCap className="w-6 h-6" />
          <span className="hidden sm:inline">かこメシ</span>
        </Link>
        
        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="sr-only">カート</span>
            </Button>
          </Link>
          
          {loading ? (
            // ローディング中の表示
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
          ) : user ? (
            // ログイン済みの場合
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full p-0 overflow-hidden">
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="User Icon"
                      width={40}
                      height={40}
                      className="rounded-full"
                      unoptimized
                      onError={(e) => {
                        e.currentTarget.src = '/default-avatar.svg';
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                  <span className="sr-only">ユーザーメニュー</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuLabel className="flex flex-col">
                  <span className="font-bold">{user.displayName || "ユーザー"}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/sell">
                  <DropdownMenuItem>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    出品する
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  ログアウト
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // 未ログインの場合
            <Button variant="ghost" className="flex items-center gap-1" onClick={handleLogin}>
              <LogIn className="w-4 h-4" />
              <span>ログイン</span>
            </Button>
          )}
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
} 