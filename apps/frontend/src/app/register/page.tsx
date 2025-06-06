'use client';

import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Label } from "@/app/components/ui/label"
import { Mail, Lock, User, Github, ChromeIcon as Google, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { signInWithGoogle } from "@/lib/firebaseAuth"
import Header from "@/app/components/Header"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      // ログイン成功後、ホームページにリダイレクト
      window.location.href = "/";
    } catch (error) {
      console.error('Googleで登録エラー:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">アカウント作成</h1>
            <p className="text-sm text-muted-foreground mt-1">新規アカウントを作成してかこメシを始めましょう</p>
          </div>

          <Card className="border-blue-100 shadow-md">
            <CardContent className="pt-6 space-y-4">
              <div className="grid gap-3">
                <Button 
                  variant="outline" 
                  className="h-12 border-blue-200 hover:bg-blue-50"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <Google className="mr-2 h-5 w-5" />
                  Googleで登録
                </Button>
                <Button 
                  variant="outline" 
                  className="h-12 border-blue-200 hover:bg-blue-50"
                  disabled={true}
                >
                  <Github className="mr-2 h-5 w-5" />
                  GitHubで登録
                </Button>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-blue-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gradient-to-b from-blue-50 to-purple-50 px-2 text-muted-foreground">または</span>
                </div>
              </div>

              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">お名前</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-4 w-4 text-blue-500" />
                    <Input
                      id="name"
                      placeholder="山田 太郎"
                      className="pl-10 h-12 border-blue-200 focus-visible:ring-blue-300 text-base"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-blue-500" />
                    <Input
                      id="email"
                      placeholder="your@email.com"
                      type="email"
                      className="pl-10 h-12 border-blue-200 focus-visible:ring-blue-300 text-base"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">パスワード</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-blue-500" />
                    <Input
                      id="password"
                      type="password"
                      className="pl-10 h-12 border-blue-200 focus-visible:ring-blue-300 text-base"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id="terms" className="h-5 w-5 rounded-md" />
                  <Label htmlFor="terms">
                    <span>利用規約と</span>
                    <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 mx-1">
                      プライバシーポリシー
                    </Link>
                    <span>に同意します</span>
                  </Label>
                </div>
                <Button className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700" disabled={true}>アカウント作成</Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center pb-6 pt-2">
              <div className="text-center text-sm">
                すでにアカウントをお持ちの場合は
                <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium ml-1">
                  ログイン
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="py-4 px-4 border-t bg-white/80">
        <div className="text-center text-xs text-muted-foreground">
          &copy; 2025 かこメシ. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
