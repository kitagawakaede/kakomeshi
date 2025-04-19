import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Checkbox } from "@/app/components/ui/checkbox"
import { Label } from "@/app/components/ui/label"
import { Mail, Lock, Github, ChromeIcon as Google, ArrowLeft } from "lucide-react"

export default function LoginPage() {
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
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold">過去問マスター</h1>
            <p className="text-sm text-muted-foreground mt-1">アカウントにログインして過去問を探索しましょう</p>
          </div>

          <Card className="border-blue-100 shadow-md">
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-4">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">パスワード</Label>
                    <Link href="/forgot-password" className="text-xs text-blue-600 hover:text-blue-800">
                      パスワードをお忘れですか？
                    </Link>
                  </div>
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
                  <Checkbox id="remember" className="h-5 w-5 rounded-md" />
                  <Label htmlFor="remember">ログイン状態を保持する</Label>
                </div>
              </div>

              <Button className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700">ログイン</Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-blue-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gradient-to-b from-blue-50 to-purple-50 px-2 text-muted-foreground">または</span>
                </div>
              </div>

              <div className="grid gap-3">
                <Button variant="outline" className="h-12 border-blue-200 hover:bg-blue-50">
                  <Google className="mr-2 h-5 w-5" />
                  Googleでログイン
                </Button>
                <Button variant="outline" className="h-12 border-blue-200 hover:bg-blue-50">
                  <Github className="mr-2 h-5 w-5" />
                  GitHubでログイン
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pb-6 pt-2">
              <div className="text-center text-sm">
                アカウントをお持ちでない場合は
                <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium ml-1">
                  新規登録
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
