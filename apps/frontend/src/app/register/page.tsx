import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Label } from "@/app/components/ui/label"
import { Mail, Lock, User, Github, ChromeIcon as Google, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col">
      <header className="py-4 px-4 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">ホームに戻る</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">アカウント作成</h1>
            <p className="text-sm text-muted-foreground mt-1">新規アカウントを作成して過去問マスターを始めましょう</p>
          </div>

          <Card className="border-blue-100 shadow-md">
            <CardContent className="pt-6 space-y-4">
              <div className="grid gap-3">
                <Button variant="outline" className="h-12 border-blue-200 hover:bg-blue-50">
                  <Google className="mr-2 h-5 w-5" />
                  Googleで登録
                </Button>
                <Button variant="outline" className="h-12 border-blue-200 hover:bg-blue-50">
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

              <div className="space-y-4">
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
                  <p className="text-xs text-muted-foreground">8文字以上で、英字・数字を含めてください</p>
                </div>
                <div className="flex items-start space-x-2 py-2">
                  <Checkbox id="terms" className="h-5 w-5 rounded-md mt-0.5" />
                  <Label htmlFor="terms" className="leading-tight">
                    <span>
                      <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                        利用規約
                      </Link>
                      と
                      <Link href="/privacy" className="text-blue-600 hover:text-blue-800 ml-1">
                        プライバシーポリシー
                      </Link>
                      に同意します
                    </span>
                  </Label>
                </div>
              </div>

              <Button className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 mt-2">アカウント作成</Button>
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
          &copy; 2024 過去問マスター. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
