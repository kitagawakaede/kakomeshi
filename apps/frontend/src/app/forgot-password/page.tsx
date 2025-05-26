import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Mail, ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col">
      <header className="py-4 px-4 flex items-center">
        <Link href="/login" className="flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">ログインに戻る</span>
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
            <h1 className="text-2xl font-bold">パスワードをリセット</h1>
            <p className="text-sm text-muted-foreground mt-2 mx-auto max-w-xs">
              登録したメールアドレスを入力してください。パスワードリセット用のリンクを送信します。
            </p>
          </div>

          <Card className="border-blue-100 shadow-md">
            <CardContent className="pt-6 space-y-4">
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

              <Button className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 mt-2">リセットリンクを送信</Button>
            </CardContent>
            <CardFooter className="flex justify-center pb-6 pt-4">
              <div className="text-center text-sm">
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  ログイン画面に戻る
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
